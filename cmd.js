#!/usr/bin/env node

//process.stdin.resume();
var fs = require("fs");
var main = require("./main.js");

var args = process.argv.slice(2, process.argv[process.argv.length - 1][0] === "-" ? undefined : -1);
var codeFromParam = process.argv[process.argv.length - 1];

console.log = function(){
	process.stdout.write(Array.from(arguments).join("  "));
};

var has = function(cmd){
	return args.includes(cmd)
};

var pipe = has("-p") || has("--pipe");
var stdin = has("-s") || has("--stdin");
var file = has("-f") || has("--file") || codeFromParam.match(/^[0-9a-zA-Z_-]+\.meme$/) || codeFromParam.match(/^"[0-9a-zA-Z_ -]+\.meme"$/);

if(pipe){
	var input = process.argv[process.argv.length - 1];
}else{
	var input = process.argv[process.argv.length - 2];
}

if(input[0] === "-" && (input.length === 2 || input[1] === "-")){
	input = undefined;
}

var verbose = has("-v") || has("--verbose");
var decompile = has("-d") || has("--decompile");
var compileStr = has("-t") || has("--compile-str");
var compile = has("-c") || has("--compile");

if(verbose){
	console.log("Input: \"" + input + "\"", args);
}

var help = has("-h") || has("--help");

var isError;

if(verbose){
	console.log("args: ", args.join(" "));
}

if(args.length && args.length - 1 && !pipe && !stdin && !verbose && !help && !file && !decompile && !compileStr){
	isError = true;
	console.error("meta-memes: unknown option(s): ", args.join(" "));
}

if((process.argv.length === 2 || (!pipe && !stdin && process.argv.length === 3 && codeFromParam[0] === "-") || ((args[args.length - 1] && args[args.length - 1][0] === "-") && !pipe && !stdin) && (!codeFromParam[0] || codeFromParam[0] === "-")) && !file && !help){
	isError = true;
	console.error("meta-memes: you need to specify code or -p, --pipe, -s, --stdin, or -f, or --file");
}

if(pipe && stdin){
	isError = true;
	console.error("meta-memes: -p / --pipe and -s / --stdin don't make sense");
}

if(pipe && file){
	isError = true;
	console.error("meta-memes: -p / --pipe and -f / --file don't make sense");
}

if(stdin && file){
	isError = true;
	console.error("meta-memes: -s / --stdin and -f / --file don't make sense");
}

if(verbose){
	var log = function () {
		console.log.apply(console, arguments);
	};
}else{
	var log = ()=>{};
}

log("stdin:", stdin, "pipe:", pipe, "file:", file, "error:", isError);

if(help || isError){
	console.log(`meta-memes: usage: meta-memes [options] [code]
-h   --help        Display this help message and exit.
-p   --pipe        Use piped code for input.
-s   --stdin       Use stdin for input.
-v   --verbose     Extra logging stuff.
-f   --file        Use a file for input.
-t   --compile-str Compile a string to code that you can use.
-c   --compile     Compile without running.
code           The meta-memes code to run.

See more details at https://github.com/meta-memes/meta-memes/blob/master/docs/cmd.md (https://git.io/vHUJX)`);
}else{
	var procCode = function(code){
		if(compileStr){
			process.stdout.write(main.compileStr(code + ""));
		}else if(compile){
			main.compile(code + "", {log: log, hex: true}, output=>{
				process.stdout.write(output.join(""));
			});
		}else if(decompile){
			main.decompile(code + "", log, function (output) {
				process.stdout.write(output);
			});
		}else{
			main(code + "", input, {
				log: log
			}, function (output) {
				process.stdout.write(output);
			});
		}
	};
	
	
	if(pipe || stdin){
		if(stdin){
			if(compileStr){
				console.log("Entering stdin/repl string compiling mode.");
			}else{
				console.log("Entering stdin/repl mode.");
			}
		}
		var data = "";
		var isStopping = false;
		
		process.stdin.setEncoding("utf8");
		
		
		process.on("SIGINT", () => {
			isStopping = true;
			process.stdout.write("Are you 100% sure you want to exit (y/n)? ");
		});
		process.on("SIGBREAK", () => {
			isStopping = true;
			process.stdout.write("Are you 100% sure you want to exit (y/n)? ");
		});
		
		process.stdin.on("readable", () => {
			var chunk = process.stdin.read();
			if(isStopping && (chunk + "").trim().toLowerCase() === "y"){
				process.exit(1);
			}else if (!isStopping && chunk !== null) {
				if(stdin){
					procCode(chunk);
				}else{
					data += chunk + "";
				}
			}
			isStopping = false;
		});

		process.stdin.on("end", () => {
			if(pipe){
				procCode(data);
			}
		});
	}else if(file){
		fs.readFile(codeFromParam, "binary", function (err, data) {
			if (err) throw err;
			log(data + "");
			
			procCode(data);
		});
	}else{
		procCode(codeFromParam);
	}
}