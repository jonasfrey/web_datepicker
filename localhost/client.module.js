import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";

let f_ensure_type = function(
    value, 
    type, 
    s_var_name 
){

}
let f_f_b_selectable__between_dates = function(
    o_date_from, 
    o_date_to
){
    if(o_date_from instanceof Date == false){
        throw new Error('type error: `o_date_from` has to be instance of `Date`');
    }
    if(o_date_to instanceof Date == false){
        throw new Error('type error');
    }
    return function(o_date){
        console.log("o-date")
        console.log(o_date)
        return o_date.getTime() > o_date_from.getTime()
        && o_date.getTime() < o_date_to.getTime()
    }


}
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

        this._o_date__being_selected = new Date(this.o_date.getTime());


        this.a_s_name_month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        this.n_selectable_years_plus_minus = 10;
        this.a_n_year = [];
        let o_date_minus = new Date(this.o_date.getTime());
        let o_date_plus = new Date(this.o_date.getTime());
        this.a_n_year.push(this.o_date.getFullYear())
        for(var n_it = 0; n_it < this.n_selectable_years_plus_minus; n_it+=1){
            o_date_minus = new Date( o_date_minus.setYear(o_date_minus.getFullYear()-1))
            o_date_plus = new Date( o_date_plus.setYear(o_date_plus.getFullYear()+1))
            this.a_n_year.push(
                o_date_minus.getFullYear(), 
                o_date_plus.getFullYear()
            )
        }
        this.a_n_year.sort((n1, n2)=>n1-n2)
        console.log(this.a_n_year)


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


let f_b_same_day = function(
    o_date_1, 
    o_date_2
){
    return o_date_1.getFullYear() == o_date_2.getFullYear()
        && o_date_1.getMonth() == o_date_2.getMonth()
        && o_date_1.getDate() == o_date_2.getDate()
}

let f_o_js__datepicker = function(
    o_state
){
    let o_js_active = null;
    let o_js_s_name_month_n_year = null;
    let o_js_a_s_name_day = {
        f_o_js: function(){
            var o_date = o_state._o_date__being_selected;
            var o_date_last_day_of_month = new Date(o_date.getFullYear(), o_date.getMonth()+1, 0);
            var o_date_first_day_of_month = new Date(o_date.getFullYear(), o_date.getMonth(), 1);
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
                                var b_day_of_this_month = o_date_day.getMonth() == o_state._o_date__being_selected.getMonth();
                                return {
                                    s_tag: 'a',
                                    href: '#',
                                    role: (b_day_of_this_month) ? 'button': '',
                                    class: [
                                        `w_1_t_7`,
                                        ...((b_day_of_this_month) ? ([
                                            `${(f_b_same_day(o_date_day, o_state.o_date) )? '': 'outline'}`,
                                            `${ b_selectable ? '': 'secondary'}`,
                                        ]): []), 
                                    ].join(" "),
                                    innerText: (b_day_of_this_month) ? o_date_day.getDate(): '',//.toString().padStart(2,'0'), 
                                    onclick: function(){
                                        if(!b_day_of_this_month){
                                            return
                                        }
                                        o_state._o_date__being_selected = o_date_day;
                                        
                                        o_js_a_s_name_day._f_render();

                                        if(b_selectable){
                                            o_state.o_date = o_date_day
                                            o_state.f_on_update__o_date();
                                        }
                                        o_state.f_on_click__o_date();
                                        o_js_a_s_name_day._f_render()
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
    let o_js_a_s_name_month = {
        f_o_js: function(){
            return {
                class: "a_s_name_month d_flex",
                a_o:[
                    ...o_state.a_s_name_month.map(
                        function(s_name_month){
                            var n_idx_month = o_state.a_s_name_month.indexOf(s_name_month);
                            var o_date_month = new Date(new Date().setMonth(n_idx_month));
                            var b_selectable = o_state.f_b_selectable(o_date_month);

                            return {
                                s_tag: 'a',
                                href: '#',
                                role:"button",
                                class: [
                                    `${(o_state._o_date__being_selected.getMonth() == o_date_month.getMonth() )? '': 'outline'}`,
                                    "s_name_month", 
                                    "clickable", 
                                    'w_1_t_3',
                                    `${ b_selectable ? '': 'secondary'}`,
                                ].join(' '),
                                innerText: s_name_month,
                                onclick: function(){
                                    o_state._o_date__being_selected = new Date(
                                        o_state._o_date__being_selected.setMonth(n_idx_month)
                                    );

                                    o_js_active = o_js_a_s_name_day;
                                    o_js_s_name_month_n_year._f_render();
                                }
                            };
                        }
                    )
                ]
            }
        }
    };

    let o_js_a_n_year = {
        f_o_js: function(){
            return {

                class: "a_n_year d_flex",
                a_o:[
                    ...o_state.a_n_year.map(
                        function(n_year){
                            var b_selectable = o_state.f_b_selectable(
                                new Date(n_year, 1, 1)
                            );

                            return {
                                s_tag: 'a',
                                href: '#',
                                role:"button",
                                class: [
                                    `${(o_state._o_date__being_selected.getFullYear() == n_year )? '': 'outline'}`,
                                    "n_year", 
                                    "clickable",
                                    'w_1_t_3',
                                    `${ b_selectable ? '': 'secondary'}`,


                                ].join(' '),
                                innerText: n_year,
                                onclick: function(){
                                    o_state._o_date__being_selected = new Date(
                                        o_state._o_date__being_selected.setFullYear(n_year)
                                    );
                                    o_js_active = o_js_a_s_name_day;
                                    o_js_s_name_month_n_year._f_render();

                                }
                            };
                        }
                    )
                ]
            }
        }
    }
    o_js_active = o_js_a_s_name_day;
    o_js_s_name_month_n_year = {
        f_o_js:function(){
            return {
                a_o:[
                    {
                        s_tag: "a",
                        class: [
                            'outline', 
                        ].join(' '),
                        role: 'button',
                        href: '#', 
                        innerText: "<", 
                        onclick: function(){
                            o_state._o_date__being_selected = new Date(
                                o_state._o_date__being_selected.setMonth(
                                    o_state._o_date__being_selected.getMonth()-1
                                )
                            );
                            o_js_s_name_month_n_year._f_render()
                        }
                    },
                    {
                        s_tag: "a",
                        class: [
                            'outline', 
                        ].join(' '),
                        role: 'button',
                        href: '#', 
                        innerText: o_state.a_s_name_month[o_state._o_date__being_selected.getMonth()].substring(0,3), 
                        onclick: function(){
                            //switch to monmth view
                            o_js_active = o_js_a_s_name_month
                            o_js_s_name_month_n_year._f_render()
 

                        }
                    },
                    {
                        s_tag: "a",
                        class: [
                            'outline', 
                        ].join(' '),
                        role: 'button',
                        href: '#', 
                        innerText: ">", 
                        onclick: function(){
                            o_state._o_date__being_selected = new Date(
                                o_state._o_date__being_selected.setMonth(
                                    o_state._o_date__being_selected.getMonth()+1
                                )
                            );
                            o_js_s_name_month_n_year._f_render()
                        }
                    },
                    {
                        s_tag: "a",
                        class: [
                            'outline', 
                        ].join(' '),
                        role: 'button',
                        href: '#', 
                        innerText: o_state._o_date__being_selected.getFullYear(), 
                        onclick: function(){
                            //switch to year view
                            o_js_active = o_js_a_n_year
                            o_js_s_name_month_n_year._f_render()
                        }
                    },
                    o_js_active

                ]
            }
        }
    }
    let o = {
        class: s_version_class,
        a_o:[
            {
                s_tag: 'div', 
                innerText: 'datepicker'
            },
            o_js_s_name_month_n_year,
        ]
    };
    var o_html = f_o_html_from_o_js(o);
    o_state.o_element_html.appendChild(o_html);
    // var o_iframe = document.createElement("iframe");
    // o_state.o_element_html.appendChild(o_iframe)
    // o_iframe.contentWindow.document.body.appendChild(o_html);

    f_add_css(
        document,
        // `./web_datepicker_pico_${f_s_version_suffix(s_version)}.min.css`
        `./pico.min.css`
    )
    f_add_css(
        document,
        null, 
        `
        .d_flex{
            display: flex;
            flex-wrap: wrap;
        }
        .w_1_t_7{
            width: calc(100%/7);
            text-align:end;
        }
        .w_1_t_3{
            width: calc(100%/3);
        }

        `
    )
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
    O_state, 
    f_f_b_selectable__between_dates
}