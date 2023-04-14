import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";

class O_state{
    constructor(
        o_element_html,
        o_date = new Date(),
        f_on_update__o_date = function(){},
        f_b_selectable = function(){},
        f_on_click__o_date = function(){return true},
    ){
        if(o_element_html instanceof HTMLElement == false){
            throw new Error('type error');
        }
        if(o_date instanceof Date == false){
            throw new Error('type error');
        }
        if(typeof f_on_update__o_date != 'function'){
            throw new Error('type error');
        }
        if(typeof f_b_selectable != 'function'){
            throw new Error('type error');
        }
        if(typeof f_on_click__o_date != 'function'){
            throw new Error('type error');
        }

        this.o_element_html = o_element_html
        this.o_date = o_date
        this.f_on_update__o_date = f_on_update__o_date
        this.f_b_selectable = f_b_selectable
        this.f_on_click__o_date = f_on_click__o_date
    }
}

let f_s_version_suffix = function(s_version_with_dot){
    let s_version_without_dot = s_version_with_dot.replaceAll(".", "_");
    return `v_${s_version_without_dot}`;
}
let s_version = `0.1`;
let s_version_class = `web_datepicker_${f_s_version_suffix(s_version)}`;

let f_add_css = function(
    o_document,
    s_path_file,
    s_css
){
    let o_el = null;
    if(s_css){
        var o_el_style = o_document.createElement("style")
        o_el_style.innerText = s_css
        o_el = o_el_style
    }else{
        o_el = o_document.createElement("link");
        o_el.rel = "stylesheet"
        o_el.href = s_path_file
        // <link rel="stylesheet" href="mystyle.css">
    }

    o_document.head.appendChild(o_el)

}



let f_o_js__datepicker = function(
    o_state
){


    let o_js_o_month = {
        f_o_js: function(){
            
            var o_date_last_day_of_month = new Date(o_state.o_date.getFullYear(), o_state.o_date.getMonth()+1, 0);
            var o_date_first_day_of_month = new Date(o_state.o_date.getFullYear(), o_state.o_date.getMonth(), 1);
            var o_date_start = o_date_first_day_of_month;
            let n_ms__one_day = 24*60*60*1000;
            while(o_date_start.getDay() != 1){
                o_date_start = new Date(o_date_start.getTime()-n_ms__one_day)
            }

            var o_date_end = o_date_last_day_of_month;
            while(o_date_end.getDay() != 0){
                o_date_end = new Date(o_date_end.getTime()+n_ms__one_day)
            }
            var a_o_date_day = [];
            var o_date_it = o_date_start; 
            while(o_date_it.getTime() <= o_date_end.getTime()){
                a_o_date_day.push(o_date_it)
                o_date_it = new Date(o_date_it.getTime()+n_ms__one_day);
            }
            var a_s_name_day = [
                "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"
            ];
            return {
                a_o:[
                    {
                        "class": [
                            "a_s_name_day", 
                            'd_flex'
                        ].join(" "),
                        a_o: [
                            ...a_s_name_day.map(function(s_name_day){
                                return {
                                    class: "w_1_t_7 clickable",
                                    innerText: s_name_day
                                }
                            })
                        ]
                    }, 
                    {
                        "class": [
                            "a_o_date_day", 
                            'd_flex'
                        ].join(" "),
                        a_o: [
                            ...a_o_date_day.map(function(o_date_day){
                                var b_selectable = o_state.f_b_selectable(o_date_day);
                                
                                return {
                                    class: 
                                    [
                                        `w_1_t_7`,
                                        `${(b_selectable) ? 'clickable' : 'disabled'}`,
                                        `${(o_date_day.getMonth() != o_state.o_date.getMonth())?'not_current_month': ''}`,
                                        `${(o_state.o_date.getTime() == o_date_day.getTime())? 'active': ''}`,     
                                    ].join(" "),
                                    innerText: o_date_day.getDate(),//.toString().padStart(2,'0'), 
                                    onclick: function(){
                                        if(b_selectable){
                                            o_state.o_date = o_date_day
                                            o_state.f_on_update__o_date();
                                            o_js_o_month._f_render();
                                        }
                                        o_state.f_on_click__o_date();
                                        // console.log(o_date_day)
                                    }
                                }
                            })
                        ]
                    }, 
                ]
            }

            // console.log(o_date_start)
            // console.log(o_date_end)
        }
    };
    let o = {
        class: s_version_class,
        a_o:[
            {
                s_tag: 'div', 
                innerText: 'datepicker'
            },
            {
                s_tag: "button", 
                class: 'btn btn-blue',
                innerText: "click"
            },
            {
                s_tag: "h1", 
                class: "text-3xl font-bold underline"
            },
            o_js_o_month
        ]
    };
    var o_html = f_o_html_from_o_js(o);
    o_state.o_element_html.appendChild(o_html);
    // var o_iframe = document.createElement("iframe");
    // o_state.o_element_html.appendChild(o_iframe)
    // o_iframe.contentWindow.document.body.appendChild(o_html);

    // f_add_css(
    //     o_iframe.contentWindow.document,
    //     // `./web_datepicker_pico_${f_s_version_suffix(s_version)}.min.css`
    //     `./pico.min.css`
    // )
    // f_add_css(
    //     o_iframe.contentWindow.document,
    //     null, 
    //     `
    //     .d_flex{
    //         display: flex;
    //         flex-wrap: wrap;
    //     }
    //     .w_1_t_7{
    //         width: calc(100%/7);
    //     }

    //     `
    // )
    // fetch("./web_datepicker_pico_v0_1.min.css").then(
    //     function(o_response){
    //         o_response.text().then(
    //             function(s){
    //                 // s = s.replace("\r\n", " ");
    //                 // console.log(s)
    //                 f_add_css(s)
    //                 // debugger
    //             }
    //         )
    //     }
    // )


    return o;
}

export {
    f_o_js__datepicker, 
    f_s_version_suffix, 
    O_state
}