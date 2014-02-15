from __future__ import absolute_import, print_function

import sys
from argparse import ArgumentParser

def hello():
    ap = ArgumentParser()
    ap.add_argument('--name', '-n', description='Name to use')
    args = ap.parse_args()
    print('Hello {name}!'.format(name=args.name))
    sys.exit(0)