import {f_o_command} from "https://deno.land/x/o_command@0.7/O_command.module.js";

import { f_s_version_suffix } from "./client.module.js";

var a_s_arg = Deno.args;
console.log(a_s_arg)
var s_version_suffix = a_s_arg[0];
if(!s_version_suffix){
    console.error('please provide an argument as a version suffix, for example deno run script.js 0.1')
    Deno.exit()
}
let s_version_suffix_nodots = f_s_version_suffix(s_version_suffix)



// # compile scss 

// 1. cd ./scss
// 2. edit pico.scss, update the selector `.web_datepicker_v0_1` to the version number for example`.web_datepicker_v0_2`
// 3. install scss `npm install -g scss`
// 4. compile the css minified `sass pico.scss pico_web_datepicker_v0_1.min.css --style compressed`
// 5. copy the compiled file `cp pico_web_datepicker_v0_1.min.css ./../../localhost/.`
var s_path = `./../pico-1.5.9/scss`;
var s_path_file__pico_web_datepicker = `${s_path}/web_datepicker_pico_${s_version_suffix_nodots}.scss`;
var s_path_file__pico_web_datepicker_compiled = `${s_path}/web_datepicker_pico_${s_version_suffix_nodots}.min.css`;
var s_path_file__pico = `${s_path}/pico.scss`;
var s_content_pico = await Deno.readTextFile(s_path_file__pico) 

var s_content_pico_web_datepicker = 
`
.web_datepicker_${s_version_suffix_nodots}{
    ${s_content_pico}
}
`

await Deno.writeTextFile(
    s_path_file__pico_web_datepicker,
    s_content_pico_web_datepicker
);
var s_command = 
`sass ${s_path_file__pico_web_datepicker} ${s_path_file__pico_web_datepicker_compiled} --style compressed`;

var o_command = await f_o_command(s_command.split(" "));
console.log(o_command)

var s_command = 
`cp ${s_path_file__pico_web_datepicker_compiled} .`;

var o_command = await f_o_command(s_command.split(" "));
console.log(o_command)