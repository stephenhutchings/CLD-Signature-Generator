fs = require "fs"
jade = require "jade"
async = require "async"

UglifyJS = require("uglify-js")

compile = (done, templatesDir) ->
    js = "var Templates = {}; \n\n"

    # get all files in templates directory
    fs.readdir templatesDir, (err, files) ->
        # keep only ".jade" files
        jadeFiles = files.filter (file) ->
            file.substr(-5) == ".jade"

        # function to compile jade templates (appending to js source)
        compileTmpl = (file, doneCompile) ->
            key = file.substr(0, file.indexOf("."))
            filePath = templatesDir + file
            fs.readFile filePath, (err, src, file) ->
                unless err
                  # store js function source into Templates.{key}
                  js += "Templates[\"#{key}\"] = \n" +
                        "  #{jade.compile(src, { debug: false, client: true})};\n\n"
                doneCompile(err)

        # foreach jadeFile, compile template, then write templates.js file
        async.forEach jadeFiles, compileTmpl, (err) ->
            done(js, err)


compile((js, err) ->
  fs.writeFile "./lib/template.js", js, ->
    files = [
      './lib/contacts.js'
      './lib/awards.js'
      './lib/runtime.js'
      './lib/zepto.min.js'
      './lib/template.js'
      './lib/script.js'
    ]

    min = UglifyJS.minify(files, {compress: false})
    fs.writeFile "./media/script.min.js", min.code
, "./views/")
