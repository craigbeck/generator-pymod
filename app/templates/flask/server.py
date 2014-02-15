from __future__ import absolute_import

import logging
import random

from flask import Flask
from flask.ext.restful import Resource, Api


class <%= className %>Flask(Flask):
    def __init__(self, *args, **kwargs):
        super(<%= className %>Flask, self).__init__(*args, **kwargs)
    def boot(self):
        return self

class MyResource(Resource):
    def get(self):
        return dict(status='ok', message='Hello!', random=random.randint(1000,9000))



logger = logging.getLogger('<%= moduleName %>')

app = <%= className %>Flask('<%= moduleName %>')
api = Api(app)
api.add_resource(MyResource, '/')
