(function(globalObj){
	if(!shoco && typeof require !== "undefined"){
		var shoco = require("./shoco.js").shoco;
	}
	if(!shoco){
		throw new Error("In the browser, shoco.js must be loaded before main.js. In node, shoco.js must be placed in the same directory as main.js!");
	}
	// console.error("SHOCO", Object.keys(shoco));
	
	
	
	var charCodeArr = Symbol("charCodeArr");
	String.prototype[charCodeArr] = function(){
		var arr = [];
		for(var i = 0; i < this.length; i++){
			arr.push(this.charCodeAt(i));
		}
		return arr;
	};
	var hex = "0123456789abcdef";
	Array.prototype.modify = function(func){
		this.forEach((item, idx, arr)=>arr[idx] = func(item));
		return this;
	};
	var isString = false;
	var string = "";
	var isNumber = false;
	var number = "";
	
	var stack = [];
	
	var reverseMemes = [
		"PPCG!",
		"Java is too verbose",
		"I want an avodad",
		"Outgolfed by Dennis",
		"This submission is written in TinyMUSH",
		"Crossed out 4 is still 4",
		"Crossed out 44 is still 44",
		"Crossed out 444 is still 444",
		"This submission is written in Foo",
		"[ ](@You)",
		"Abandon all work ye who enter here",
		"Chat stars",
		"Code review",
		"Geobits downvotes",
		"Carrot",
		"ಠ_ಠ"
	];
	
	var isHex = false;
	var isDone = false;
	var memes = [//regexes!
		/^PPCG!?$/i,//#0
		/^(java( is too (long|verbose))?|At least it's not as long as java|java)$/i,//#1
		/^((I want an )?(avocado|avocad|avodad))$/i,//#2
		/^(((Outgolfed by )?@?Denn?is)|(Failing to Outgolf Denn?is)|(One does not simply outgolf @?Denn?is)|Denn?is)$/i,//#3
		/^((This (submission|answer) is written in )?TinyMUSH)$/i,//#4
		/^(Crossed out 4 is still 4|4)$/i,//#5
		/^(Crossed out 44 is still 44|44)$/i,//#6
		/^(Crossed out 444 is still 444|444)$/i,//#7
		/^((This (submission|answer) is written in )?foo)$/i,//#8
		/^(\[(\u00a0| )*\]\(@?[^)]+\)|stealth( ping)?)$/i,//non-breaking space, space, or nothing #9
		/^(Abandon( all work( ye who enter here)?)?)$/i,//#10
		/^((Chat )?stars)$/i,//#11
		/^((Code )?review)$/i,//#12
		/^(@?Geobits( downvotes?)?)$/i,//#13
		/^(Carrots?|carrot\.[a-z]+|\^+|V+|\u261D)$/i,//up index finger is \u261D #14
		/^(\u0ca0(_|\.)+\u0ca0|◯_◯|O(_|\.)O|_\._)$/i//ಠ_ಠ and friends #15
	];
	
	var functions = {
		"1": function(){
			isNumber = true;
		},
		"2": function(){
			isString = true;
		},
		"3": function(){
			isCompString = true;
		},
		"4": function(){
			if(stack[stack.length - 1] !== undefined){
				isDone = true;
			}
		},
		"5": function(){
			stack.push(stack.shift());
		},
		"6": function(){
			stack.unshift(stack.pop());
		},
		"7": function(){
			stack.shift();
		},
		"8": function(){
			stack.pop();
		},
		"9": function(){
			//remove STS
			stack = stack.slice(0, -2).concat(stack.slice(-1));
		},
		"10": function(){
			isRegex = true;
		},
		"11": function(){
			if(stack[stack.length - 2] !== undefined){
				stack.push(stack[stack.length - 2].split(stack[stack.length - 1]));
			}
		},
		"12": function(){
			stack.push(stack.reduce((x, y)=>x+y));
		},
		"13": function(){
			stack.push(stack.reduce((x, y)=>x*y));
		},
		"14": function(){
			stack.push(stack[0].repeat(parseInt(stack[1])));
		},
		"15": function(){
			isDone = true;
		}
	};
	globalObj.metaMemes = function(code, input, options = {}, callback){
		/// ///////////////////////////////////////////////////////////
		isString = false;
		string = "";
		isNumber = false;
		number = "";
		isCompString = false;
		compString = "";
		isRegex = false;
		regex = "";
		stack = [input];
		if(stack[0] === undefined){
			stack.pop();
		}
		
		var log = options.log || (()=>{});
		
		globalObj.metaMemes.compile(code, {log: log}, code=>{
			code = code.join("");
			log("Hex:", code);
			
			code = code.split("0").filter(Boolean);
			log("Split: ", code);
			
			code.forEach(codeBit=>{
				if(isDone){
					return;
				}
				log("\tProcessing codeBit:", codeBit);
				var procNum = function(codeBit, recursionCounter = 0){
					codeBit.forEach(bit=>{
						if(!bit){
							return;
						}
						log("\t".repeat(recursionCounter + 2) + "processing bit: " + bit);
						/* if(isString){
							log("\t".repeat(recursionCounter + 1) + "isString, adding ", bit);
							string += bit;
						}if(isNumber){
							log("\t".repeat(recursionCounter + 1) + "isNumber, adding ", bit);
							number += bit;
						}else */if(functions[bit]){
							log("\t".repeat(recursionCounter + 2) + "bit found and called");
							functions[bit]();
							if(isDone){
								return;
							}
						}else{ 
							log("\t".repeat(recursionCounter + 2) + "bit not found, calling: ", [bit.slice(0, -1), bit[bit.length - 1]]);
							recursionCounter++;
							//procNum([bit.slice(0, -1), bit[bit.length - 1]], recursionCounter);
						}
					});
					if(isDone){
						return;
					}
				};
				
				var one = codeBit.indexOf(1);
				var two = codeBit.indexOf(2);
				var three = codeBit.indexOf(3);
				var ten = codeBit.indexOf("a");
				
				log("\t\tone: ", one, "two:", two, "three:", three, "ten:", ten);
				if(one === -1 && two === -1 && three === -1 && ten === -1){
					var index = -1;
				}else{
					if(one === -1){
						one = Infinity;
					}
					if(two === -1){
						two = Infinity;
					}
					if(three === -1){
						three = Infinity;
					}
					if(ten === -1){
						ten = Infinity;
					}
					
					var arr = [one, two, three, ten];
					var index = arr.indexOf(Math.min(...arr));
				}
				
				log("\t\tindex:", index);
				
				var foundFuncs = [
					()=>{
						log("\t\tFound 1!");
						log("\t\t\tCalling", codeBit.slice(0, one), "before");
						isNumber = true;
						number += codeBit.slice(one + 1);
						log("\t\t\tadding", codeBit.slice(one + 1));
						procNum([codeBit.slice(0, one)]);
					},
					()=>{
						log("\t\tFound 2!");
						log("\t\t\tCalling", codeBit.slice(0, two), "before");
						isString = true;
						string += codeBit.slice(two + 1);
						log("\t\t\tadding", codeBit.slice(two) + 1);
						procNum([codeBit.slice(0, two)]);
					},
					()=>{
						log("\t\tFound 3!");
						log("\t\t\tCalling", codeBit.slice(0, three), "before");
						isCompString = true;
						compString += codeBit.slice(three + 1);
						log("\t\t\tadding", codeBit.slice(three + 1));
						procNum([codeBit.slice(0, three)]);
					},
					()=>{
						log("\t\tFound 10!");
						log("\t\t\tCalling", codeBit.slice(0, two), "before");
						isRegex = true;
						regex += codeBit.slice(two + 1);
						log("\t\t\tadding", codeBit.slice(two) + 1);
						procNum([codeBit.slice(0, two)]);
					},
				];
				
				if(index !== -1){
					foundFuncs[index]();
				}else{
					procNum([codeBit]);
				}
				if(isString){
					log("\t\tstring:", string);
					var str = (string.match(/../g) || []).map(x=>x.replace(/(.)/g, x=>hex[hex.indexOf(x) - 1])).map(c=>String.fromCharCode(parseInt(c, 15))).join("");
					stack.push(str);
					log("\tPushing str:", str, "at", string);
				}
				if(isRegex){
					log("\t\tregex:", regex);
					var str = new RegExp((regex.match(/../g) || []).map(x=>x.replace(/(.)/g, x=>hex[hex.indexOf(x) - 1])).map(c=>String.fromCharCode(parseInt(c, 15))).join(""), "g");
					stack.push(str);
					log("\tPushing regex:", str, "at", regex);
				}
				if(isNumber){
					log("\t\tnum is ", number);
					if(!number){
						var num = 0;
					}else{
						var num = parseInt(number.match(/./g).map(x=>x.replace(/(.)/g, x=>hex[hex.indexOf(x) - 1])).join(""), 15);
					}
					stack.push(num);
					log("\t\tPushing num:", num, "at", number);
				}
				if(isCompString){
					// var str = (shoco.decompress || shoco._shoco_decompress)(new Uint8Array([compString.split("").map(x=>hex[hex.indexOf(x) - 1]).join("").match(/(..)/g).map(x=>parseInt(x, 15))]));
					var str = (shoco.decompress || shoco.Md)(new Uint8Array([150]));
					log(Array.from(new Uint8Array([compString.split("").map(x=>hex[hex.indexOf(x) - 1]).join("").match(/(..)/g).map(x=>parseInt(x, 15))])));
					stack.push(str);
					log("\tPushing compStr:", str);
				}
				isNumber = isCompString = isString = false;
				number = compString = string = "";
			});
			log("stack: ", stack);
			var out = stack[stack.length - 1] ? stack[stack.length - 1] + "" : "";
			callback(out);
		});
	};
	
	globalObj.metaMemes.compile = function(code, options = {}, callback){
		var log = options.log || (()=>{});
		isHex = options.hex;
		var tryCatch = function(func){
			try{
				return func();
			}catch(e){
				return null;
			}
		};
		var removeComments = function(code){
			var returner;
			(code.match(/^[^#]+/gm) || []).forEach((item, idx, arr)=>{
				arr[idx] = item.trim();
				returner = arr;
			});
			return returner.join("\n");
		};
		var convertToNumArr = function(arr, desc){
			try{
				log("\t\tTrying out ", desc);
				arr.forEach((item, idx)=>{
					var memeIdx;
					log("\t\tarr: Processing ", item);
					if(!memes.some((meme, idx)=>{
						log("\t\t\tcomparing", item, "to", meme);
						if(meme.test){
							if(meme.test(item.toLowerCase().trim())){
								log("\t\t\t\tmeme matches (exp), setting memeIdx to ", idx);
								memeIdx = idx;
								return true;
							}else{
								log("\t\t\t\tnot a match (exp)");
								return false;
							}
						}else{
							if(meme.toLowerCase().trim() === item.toLowerCase().trim()){
								log("\t\t\t\tmeme matches");
								return true;
							}else{
								log("\t\t\t\tnot a match");
								return false;
							}
						}
					})){
						log("\t\t\t" + item + " was not a valid meme\n");
						throw 0;
					}
					if(memeIdx !== undefined){
						log("\t\t\tUsing memeIdx", memeIdx);
						arr[idx] = memeIdx;
					}else{
						log("\t\t\tUsing index", memes.indexOf(item.toLowerCase().trim()));
						arr[idx] = memes.indexOf(item.toLowerCase().trim());
					}
					if(arr[idx] === -1){
						log("\t\t\t", item, "is not a valid meme");
						throw 0;
					}
				});
				return arr;
			}catch(e){
				return false;
			}
		};
		
		code = code.replace ? code.replace(/\r/g, "") : code;//remove evil nothings-style newlines and convert them to amazing *nix-style
		code = code.trim ? code.trim() : code;
		log("Preprocessing code: ", code);
		if((typeof code === "object" && Array.isArray(code)) || (code.match && code.match(/^(\d| |,|, )+$/))){//an array of numbers, e.g [1, 15, 0, 2, 6], no transformation needed
			
			var temp;
			if(code.match){
				log("\t\tmatching...", temp);
				temp = code.match(/(?:\d{1,2}( |,)?)/g);
				if(temp.length){
					log("\t\tmatched!", temp);
					temp = temp.filter(Boolean);
					if(temp.length){
						log("\t\tfiltered!", temp);
						temp = temp.map(item=>+(item.replace(/,| /g, "")));
						code = temp;
						log("\tTransformed list of ints to an array:", code);
					}
				}
			}else{
				log("\tcode is already an array of integers: ", code);
			}
			//code;
		}else{
			var temp;
			temp = tryCatch(()=>removeComments(code));
			code = temp ? temp : code;
			log("\tNo more comments: ", code);
			if(temp = convertToNumArr(code.split(/(?=[A-Z])/g), "uppercase")){
				log("\tupper-case delimited.");
				code = temp;
			}else if(code.includes("\n") && (temp = convertToNumArr(code.split("\n"), "newlines"))){
				log("\tnewline-delimited");
				code = temp;
			}else if(code.includes(",") && (temp = convertToNumArr(code.split(","), "commas"))){
				log("\tcomma-delimited");
				code = temp;
			}else if(!code.trim()){
				log("\nYour code is empty.");
				code = [];
				callback("Hello, World!");
			}else if(parseInt(code, 16)){
				isHex = true;
				code = code.split("");
			}else{
				log("\tyou are using literal hex (compiled mode)");
				code = code[charCodeArr]().map(x=>("00" + x.toString(16)).slice(-2));
				log("\tConverted to hex str: ", code);
				isHex = true;
				// throw new SyntaxError("I have no idea what delimiter you are using! Try running with -v or verbose set to true or using caps, newlines, or commas as delimiters.");
			}
		}
		log("Fully processed code: ", code, isHex);
		//code.map(num=>(num + "").length === 1 ? "0" + num : "" + num);
		//log("0-padded: ", code);
		if(isHex){
			code = code.map(num=>num.toString(16));
		}else{
			code = (code.join("").match(/../g) || []).map(num=>String.fromCharCode(num));
		}
		callback(code);
	};
		
	
	globalObj.metaMemes.decompile = function(code, options = {}, callback = ()=>{}){
		var log = options.log || (()=>{});
		if(!isNaN(parseInt(code, 16))){
			var code = code.split("").map(x=>reverseMemes[parseInt(x, 16)]);
			log("Decompilied to code", code + "");
			callback(code);
		}else{
			var code = code[charCodeArr]().map(x=>("00" + x.toString(16)).slice(-2)).join("").split("").map(x=>reverseMemes[parseInt(x, 16)]).join("\n");
			log("Decompilied to code", code + "");
			callback(code);
		}
	};
	
	globalObj.metaMemes.compileStr = str=>str.split("").map(c=>c.charCodeAt(0)).map(num=>(num).toString(15)).map(x=>x.replace(/(.)/g, x=>hex[hex.indexOf(x) + 1])).join("");
	
	if(typeof module !== "undefined"){ 
		module.exports = globalObj.metaMemes;
	}
})(this);