How to upgrade to the latest database version using alembic:

From `sf_appserver`, run:
    

```
bin/migrate [ENV] <%= modulePath %>/<%= moduleName %>/alembic.ini upgrade head
```

How to downgrade to the base version using alembic:

```
bin/migrate [ENV] <%= modulePath %>/<%= moduleName %>/alembic.ini downgrade base
```

To get alembic to create a version table with the latest version:

```
bin/migrate [ENV] <%= modulePath %>/<%= moduleName %>/alembic.ini stamp head
```
