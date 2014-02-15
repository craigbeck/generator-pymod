from __future__ import absolute_import

import logging

from flask import Flask
from flask.ext.restful import Resource, Api


class ServiceFlask(Flask):
    def on_boot(self):
        pass

class MyResource(Resource):
    def get(self):
        return dict(status='ok')


logger = logging.getLogger('<%= moduleName %>')

app = ServiceFlask('<%= moduleName %>')
api = Api(app)
api.add_resource(MyResource)
