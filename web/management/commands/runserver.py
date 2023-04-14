import atexit
import os
import platform
import subprocess
import sys

from django.core.management.commands.runserver import Command as BaseRunserverCommand
from django.core.servers.basehttp import WSGIServer, WSGIRequestHandler
from django.conf import settings

_ALREADY_WATCHING = False
_ALREADY_WATCHING_RUST = False

_SHELL = platform.system() == "Windows"


def _safe_kill(p):
    try:
        p.terminate()
        p.wait(5)
    except:
        pass
    try:
        p.kill()
    except:
        pass


class WSGIRequestHandlerWithRawURL(WSGIRequestHandler):
    def get_environ(self):
        env_base = super().get_environ()
        env_base['RAW_PATH'] = self.path
        return env_base


class WSGIServerWithRawURL(WSGIServer):
    def __init__(self, address, _handler, **kwargs):
        super().__init__(address, WSGIRequestHandlerWithRawURL, **kwargs)


class Command(BaseRunserverCommand):
    server_cls = WSGIServerWithRawURL

    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument('--watch', action='store_true', dest='watch', help='Runs JS build in development mode')
        parser.add_argument('--log_build', action='store_true', dest='log_build', help='Log JS build process')
        parser.add_argument('--internal-run', action='store_true', dest='internal_run',
                            help='This starts the actual server')

    def handle(self, *args, **options):
        if options['watch'] and not options['internal_run']:
            self.watch_js(options['log_build'])
        super().handle(*args, **options)

    def watch_js(self, log_build: bool = False):
        global _ALREADY_WATCHING
        if _ALREADY_WATCHING or os.environ.get('RUN_MAIN') == 'true':
            return
        print('Will watch JS ' + repr(self))
        p = subprocess.Popen(['ng', 'build', '--watch', '--output-path', settings.BASE_DIR / "static"],
                             stdout=subprocess.DEVNULL if not log_build else None,
                             stderr=subprocess.STDOUT if not log_build else None, shell=_SHELL,
                             cwd=settings.BASE_DIR / "frontend")
        atexit.register(lambda: _safe_kill(p))
        _ALREADY_WATCHING = True

    # Runs this command but with --internal-run
    def run_child(self, second=False):
        add_args = ['--skip-checks']
        # with shell=False it does NOT interrupt as intended
        c = subprocess.Popen([sys.executable] + sys.argv + ['--internal-run', '--noreload'] + add_args, shell=_SHELL)
        return c
