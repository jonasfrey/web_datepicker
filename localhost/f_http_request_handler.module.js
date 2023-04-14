import {o_http_request_handler_file_explorer} from "https://deno.land/x/o_webserver@8.6/a_o_http_request_handler.module.js"
 
let f_http_request_handler = function(
  o_http_connection, 
  o_request_event,
  o_webserver
){
    // you can extend the behaviour here for example
    // if(o_request_event.request.url.includes("/private/")){
    //     return o_request_event.respondWith(
    //         new Response(
    //             "forbidden ヽ(ಠ_ಠ)ノ",
    //             { status: 403 }
    //         )
    //     );
    // }
    return o_http_request_handler_file_explorer.f_http_request_handler(
      o_http_connection, 
      o_request_event,
      o_webserver
    );
};
 
export {f_http_request_handler}