from <%= moduleName %>.server import app

app.debug = True
app.boot().run(host='0.0.0.0',
               port=5000,
               use_reloader=True,
               threaded=True)
