from __future__ import absolute_import
from sqlalchemy import Model, Column
from sqlalchemy.types import Integer

BIND_KEY = '<%= moduleName %>'

class SampleModel(Model):
    __bind_key__ = BIND_KEY
    __tablename__ = 'sample'
    id_ = Column('id', Integer, primary_key=True)

