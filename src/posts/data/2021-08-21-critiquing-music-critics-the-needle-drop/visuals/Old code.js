// import dropdownMenu from '../../Modules/dropdownMenu';
// import checkboxGroup from '../../Modules/checkboxGroup.js';

// import * as d3 from 'd3';

// import data from '../Data/fantano_7_15_21_albums.csv';
// import { TNDProvider } from './TNDContext';
// // import { createContext } from 'react';

// import SVG1 from './svg1';

// const TNDContainer = () => {
//     const w_width = window.innerWidth, w_height = window.innerHeight;
//     const article_width = (w_width <= 450) ? 0.95: 0.6; // ternary operator
//     const article_height = 0.75;
//     const padding_v = 60, padding_h = 60;
//     const config = {
//         "vw": article_width * w_width,
//         "vh": article_height * w_height,
//         "small_vh": article_height * w_height * 0.8,
//         "inner_vw": article_width * w_width - padding_h,
//         "inner_vh": article_height * w_height - padding_v,
//         "small_inner_vh": article_height * w_height * 0.8 - padding_v,
//         "anim_speed": 3000,
//         "color1": "#FCF281",
//         "stroke1": "#262626"
//     }

    
// let album_data,album_data1,albums_by_year, grouped_by_genre, gbg_quantiles, gba_quantiles, grouped_by_artist;
//     const testval = 1;
//     return (
//         <>
//             <TNDProvider value={{
//                 testval,
//                 config,
//                 dropdownMenu,
//                 album_data,
//                 album_data1
//             }}>
//                 < SVG1 />
//             </TNDProvider>
//         </>
//     )
// }

// export default TNDContainer;

// let annual_average = [],albums_by_genre = [], albums_by_artist = [], albums_by_genre_f = [], gbg_quantiles_f = [], 
//     artist_average = [],artist_n = [], albums_by_artist_f = [], artists_f, gba_quantiles_f = [];
// let num_reviews = 2, num_artists = 10;
// let annual_avg_data, artist_avg_data, tooltip_content;
// const parseTime = d3.timeParse("%d-%b-%y");

// annual review scores pt. 2
// const render_s2 = () => {
//     const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
//     var svg2 = d3.select("#stat-svg2");
//     svg2
//         .style("width", config.vw + 'px')
//         .style("height", config.vh + 'px');
//     // x axis
//     const xScale = d3.scaleTime()
//         .domain(d3.extent(album_data,d => d.Date))
//         .range([(config.vw - config.inner_vw * 0.95), config.inner_vw]);
//     const xAxis = d3.axisBottom().scale(xScale);
//         svg2.append("g").attr('class','xaxis');
//         svg2.select('g.xaxis')    
//             .attr("transform", "translate(0," + config.inner_vh + ")")
//             .transition(t)
//             .call(xAxis);
//     const xLabel = svg2.append("text")
//         .attr("class", "xlabel");
//     svg2.select('.xlabel')
//         .attr("text-anchor", "left")
//         .attr("x", config.vw/2)
//         .attr("y", config.vh - 10)
//         .text('Year');
//     // y axis
//     const yScale = d3.scaleLinear()
//         .domain(d3.extent(album_data,d => d.Score))
//         .range([config.inner_vh, (config.vh - config.inner_vh * 0.95)]);
//     const yAxis = d3.axisLeft().scale(yScale);
//     svg2.append("g").attr('class','yaxis');
//     svg2.select('g.yaxis')    
//         .attr("transform", "translate("+ (config.vw - config.inner_vw) + ",0)")
//         .transition(t)
//         .call(yAxis);
//     const yLabel = svg2.append("text")
//         .attr("class", "ylabel");
//     svg2.select('.ylabel')
//         .attr("text-anchor", "middle")
//         .attr("x", -config.vh/2)
//         .attr("y",20)
//         .attr("transform", "rotate(-90)")
//         .text('Score');
    
//     // draw all scores
//     svg2.append("g")
//         .attr("id", "allScores")
//         .selectAll("circle")
//         .data(album_data, d => {(d.Artists[0] + d.Album)})
//         .join(
//             enter => enter.append("circle"))
//             .attr('id',d=>{return (d.Artists[0] + d.Album)})
//             .attr('r',5)
//             .attr('cx',d => xScale(d.Date))
//             .attr('cy',d => yScale(Math.max(-1,d.Score + Math.random() * 0.2 - 0.1)))
//             .attr("fill", color1)
//             .attr("stroke", stroke1)
//             .attr('opacity', 0.3);

//     // add average score
//     svg2.append("g")
//         .attr("id", "avgScores")
//         .selectAll("circle")
//         .data(annual_avg_data, d => d.Year)
//         .join(
//             enter => enter.append("circle"))
//             .attr('r',5)
//             .attr('cx',d => xScale(d.Year))
//             .attr('cy',d => yScale(d.Score))
//             .attr("fill", color2)
//             .attr("stroke", stroke1);

//     // add best fit line
//     let line = d3.line()
//         .x((d) => xScale(d[0]))
//         .y((d) => yScale(d[1]));
    
//     svg2.append("path")
//         .datum([[parseTime('20-Oct-12'),6.3],[parseTime('10-Jul-21'),6]])
//         .attr("d", line)
//         .attr("stroke", "black")
//         .attr("stroke-width", 2);
// };

// const genre_colors = {
//     'hip hop': '', 
//     'pop': '',
//     'r&b': '', 
//     'soul': '', 
//     'jazz': '', 
//     'electronic': '',
//     'dance': '',
//     'house': '',
//     'techno': '',
//     'funk': '', 
//     'ambient': '',
//     'rock': '',
//     'punk': '', 
//     'metal': '',
//     'psychedelic': '', 
//     'experimental': '', 
//     'singer-songwriter': '',
//     'folk': '',
//     'country': ''
// };
// const onGenreChecked =  value => {
//     // console.log(value);
//     if (checked_genres.includes(value)){ // if included, remove
//         const index = checked_genres.indexOf(value);
//         checked_genres.splice(index,1);
//     }
//     else{ // else, add
//         checked_genres.push(value);
//     }
//   render_s3(stat3);
// };

// // menu 1
// const cb_genres = [
//     'hip hop', 'pop','r&b', 'soul', 'jazz', 'electronic','dance','house','techno',
//     'funk', 'ambient','rock','punk', 'metal','psychedelic', 'experimental', 
//     'singer-songwriter','folk','country'
// ]
// let checked_genres = cb_genres;
// d3.select('#stats-menu3')
//         .call(checkboxGroup,{
//         values: cb_genres,
//         onValueChanged: onGenreChecked,
//         checkedValues: checked_genres,
//         checkbox_class: 'genre-checkbox'
//     });

// // menu2
// const onGraphChecked =  value => {
//     // console.log(value);
//     if (checked_graphs.includes(value)){ // if included, remove
//         const index = checked_graphs.indexOf(value);
//         checked_graphs.splice(index,1);
//     }
//     else{ // else, add
//         checked_graphs.push(value);
//     }
//     render_s3(stat3);
// };
// const graph_types = ['boxplots','individual points'];
// let checked_graphs = ['boxplots'];
// d3.select('#stats-menu3a')
//     .call(checkboxGroup,{
//     values: graph_types,
//     onValueChanged: onGraphChecked,
//     checkedValues: checked_graphs
// });

// // menu 3
// const onStat3Clicked = selection => {
//     stat3 = selection;
//     render_s3(stat3)
// };
// const stats3 = ['--Select--','Number of reviews','Median','Mean',"Variance"];
// let stat3 = stats3[0];
// d3.select('#stats-menu3b')
//     .call(dropdownMenu,{
//     options: stats3,
//     onOptionClicked: onStat3Clicked,
//     selectedOption: stat3,
//     label: 'Sort Genres by: '
//     });
// const update_genres = checked_genres => {
//     albums_by_genre_f = [];
//     albums_by_genre.forEach(a => {
//         if(checked_genres.includes(a.Genre)){
//             albums_by_genre_f.push(a);
//         }
//     });
//     gbg_quantiles_f = [];
//     gbg_quantiles.forEach(g => {
//         // console.log(g.genre);
//         if(checked_genres.includes(g.genre)){
//             gbg_quantiles_f.push(g);
//         }
//     });
// };

// // menu 3 btns
// let select_all_btn = document.getElementById('select-all-btn');
// let deselect_all_btn = document.getElementById('deselect-all-btn');
// select_all_btn.onclick = () => {
//     let checkboxes = document.getElementsByClassName('genre-checkbox');
//     for(let c of checkboxes){
//         c.checked = true;
//         // console.log(c);
//         // console.log(c.id);
//     };
//     checked_genres = []; // clear first
//     checked_genres = cb_genres;
//     render_s3(stat3);
// };

// deselect_all_btn.onclick = () => {
//     let checkboxes = document.getElementsByClassName('genre-checkbox');
//     for(let c of checkboxes){
//         c.checked = false;
//         // console.log(c);
//     };
//     checked_genres = [];
//     render_s3(stat3);
// };

// // interactive link
// let by_num_reviews = document.getElementById('interactive-link-1');
// by_num_reviews.onclick = () => {
//     document.getElementById('stats-menu3b').value='Number of reviews';
//     let options = document.getElementById('Sort Genres by: ').options;
//     for(let i=0; i < options.length; i++)
//     {
//         if(options[i].value === 'Number of reviews') {
//             options.selectedIndex = i;
//             break;
//         }
//     };
//     stat3 = 'Number of reviews';
//     render_s3(stat3);
// };
// let by_means = document.getElementById('interactive-link-2');
// by_means.onclick = () => {
//     document.getElementById('stats-menu3b').value='Mean';
//     let options = document.getElementById('Sort Genres by: ').options;
//     for(let i=0; i < options.length; i++)
//     {
//         if(options[i].value === 'Mean') {
//             options.selectedIndex = i;
//             break;
//         }
//     };
//     stat3 = 'Mean';
//     render_s3(stat3);
// };

// // scores by genre
// const render_s3 = (stat3) => {
//     // update genres
//     update_genres(checked_genres);
//     // sort remaining genres by criteria
//     let sortable = [];
//     if(stat3 == "Number of reviews"){
//         gbg_quantiles_f.forEach(g =>
//             sortable.push([g.genre,g.n])
//         );
//     }
//     else if(stat3 == 'Median'){
//         gbg_quantiles_f.forEach(g =>
//             sortable.push([g.genre,g.median])
//         );
//     }
//     else if(stat3 == 'Mean'){
//         gbg_quantiles_f.forEach(g =>
//             sortable.push([g.genre,g.mean])
//         );
//     }
//     else if(stat3 == 'Variance'){
//         gbg_quantiles_f.forEach(g =>
//             sortable.push([g.genre,g.var])
//         ); 
//     }
//     sortable.sort(function(a, b) {
//         return b[1] - a[1]; // descending
//     });
//     console.log(sortable);
//     if (stat3 != '--Select--'){
//         checked_genres = sortable.map(s => s[0]);
//         console.log(checked_genres);
//     }
//     // console.log(checked_graphs)
//     const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
//     var svg3 = d3.select('#stat-svg3');
//     svg3
//         .style("width", config.vw + 'px')
//         .style("height", (config.small_vh + 10) + 'px');

//     // axes + scales
//     var xScale = d3.scaleBand()
//         .range([(config.vw - config.inner_vw * 0.95), config.inner_vw])
//         .domain(checked_genres)
//         .paddingInner(1)
//         .paddingOuter(.5)
//     const xAxis = d3.axisBottom().scale(xScale);
//     svg3.append("g").attr('class','xaxis');
//     svg3.select('g.xaxis')  
//         .attr("transform", "translate(0," + config.small_inner_vh + ")")
//         .transition(t)
//         .call(xAxis).selectAll("text")
//         .attr("y", 0)
//         .attr("x", 9)
//         .attr("dy", ".35em")
//         .attr("transform", "rotate(30)")
//         .style("text-anchor", "start");
//     const xLabel = svg3.append("text")
//         .attr("class", "xlabel");
//     svg3.select('.xlabel')
//         .attr("text-anchor", "left")
//         .attr("x", config.vw/2)
//         .attr("y", config.small_vh - 10)
//         .text('Genre');

//     var yScale = d3.scaleLinear()
//         .domain([-1,10])
//         .range([config.small_inner_vh, (config.small_vh - config.small_inner_vh * 0.95)])
//     svg3.append("g")
//         .attr("transform", "translate("+ (config.vw - config.inner_vw) +",0)")
//         .transition(t)
//         .call(d3.axisLeft(yScale))
//     const yLabel = svg3.append("text")
//         .attr("class", "ylabel");
//     svg3.select('.ylabel')
//         .attr("text-anchor", "middle")
//         .attr("x", -config.small_vh/2)
//         .attr("y",20)
//         .attr("transform", "rotate(-90)")
//         .text('Score');
//     // label size
//     d3.selectAll(".xaxis>.tick>text")
//     .each(function(d, i){
//         d3.select(this).style("font-size","13px");
//     });

//     // add boxplots
//     // vertical line
//     svg3
//         .selectAll(".boxplot-vert")
//         .data(gbg_quantiles_f, d => d.genre)
//         .join(
//             enter => enter.append("line")
//                 .attr("class","boxplot-vert")
//                 .style('opacity', 0)
//                 .attr("y1", d => yScale(d.min))
//                 .attr("y2", d => yScale(d.min))
//                 .attr("x1", d => xScale(d.genre))
//                 .attr("x2", d => xScale(d.genre))
//                 .call(enter => enter.transition(t)
//                 .style("opacity",1)
//                 .attr("y1", d => yScale(d.min))
//                 .attr("y2", d => yScale(d.max))
//                 .attr("stroke", "black")
//                 .style("width", 40)
//                 )
//             ,
//             update => update
//                 .call(update => update.transition(t)
//                     .style("opacity",1)
//                     .attr("x1", d => xScale(d.genre))
//                     .attr("x2", d => xScale(d.genre))
//                     .attr("y1", d => yScale(d.min))
//                     .attr("y2", d => yScale(d.max))
//                 )
//             ,
//             exit => exit
//                 .call(exit => exit.transition(t)
//                 .attr("y1", d => yScale(d.min))
//                 .attr('y2', d => yScale(d.min))
//                 .style('opacity', 0)
//                 .remove())
//         )
            
//     // rect + quantiles
//     var boxWidth = 20;
//     svg3
//         .selectAll("rect")
//         .data(gbg_quantiles_f, d => d.genre)
//         .join(
//             enter => enter.append("rect")
//                 .style('opacity', 0)
//                 .attr("class","boxplot-box")
//                 .attr("stroke", "black")
//                 .style("fill", color1)
//                 .attr("x", d => {return(xScale(d.genre)-boxWidth/2)})
//                 .attr("y", d => {return(yScale(d.Q1))})
//                 .attr("width", boxWidth )
//                 .call(enter => enter.transition(t)
//                 .style("opacity",1)
//                 .attr("y", d => {return(yScale(d.Q3))})
//                 .attr("height", d => {return(yScale(d.Q1)-yScale(d.Q3))})
//                 )
//             ,
//             update => update
//                 .call(update => update.transition(t)
//                 .attr("stroke", "black")
//                 .style("fill", color1)
//                 .style("opacity",1)
//                 .attr("height", d => {return(yScale(d.Q1)-yScale(d.Q3))})
//                 .attr("x", d => {return(xScale(d.genre)-boxWidth/2)})
//                 .attr("y", d => {return(yScale(d.Q3))})
//                 )
//             ,
//             exit => exit
//                 .call(exit => exit.transition(t)
//                 .attr("y", d => {return(yScale(d.Q1))})
//                 .attr("height", 0)
//                 .style('opacity', 0)
//                 .remove())
//         );
            
//     // median
//     svg3
//         .selectAll(".boxplot-median")
//         .data(gbg_quantiles_f,d => d.genre)
//         .join(
//             enter => enter.append("line")
//                 .style('opacity', 0)
//                 .attr("class","boxplot-median")
//                 .attr("x1", d => {return(xScale(d.genre)-boxWidth/2) })
//                 .attr("x2", d => {return(xScale(d.genre)-boxWidth/2) })
//                 .attr("y1", d => {return(yScale(d.median))})
//                 .attr("y2", d => {return(yScale(d.median))})
//                 .attr("stroke", "black")
//                 .style("width", 80)
//                 .call(enter => enter.transition(t)
//                 .style("opacity",1)
//                 .attr("x2", d => {return(xScale(d.genre)+boxWidth/2) })
//                 )
//                 ,
//             update => update
//                 .call(update => update.transition(t)
//                 .attr("stroke", "black")
//                 .style("width", 80)
//                 .style("opacity",1)
//                 .attr("x1", d => {return(xScale(d.genre)-boxWidth/2) })
//                 .attr("x2", d => {return(xScale(d.genre)+boxWidth/2) })
//                 .attr("y1", d => {return(yScale(d.median))})
//                 .attr("y2", d => {return(yScale(d.median))})
//                 )
//             ,
//             exit => exit
//                 .call(exit => exit.transition(t)
//                 .attr("y1", d => {return(yScale(d.min))})
//                 .attr("y2", d => {return(yScale(d.min))})
//                 .style("opacity",0)
//                 .remove())
//         );
    
//     // console.log(checked_graphs);
//     if (!checked_graphs.includes('boxplots')){
//         // hide boxplots
//         svg3.selectAll(".boxplot-vert")
//             .style("visibility","hidden");
//         svg3.selectAll(".boxplot-box")
//             .style("visibility","hidden");
//         svg3.selectAll(".boxplot-median")
//             .style("visibility","hidden");
//     }
//     else{
//         svg3.selectAll(".boxplot-vert")
//             .style("visibility","visible");
//         svg3.selectAll(".boxplot-box")
//             .style("visibility","visible");
//         svg3.selectAll(".boxplot-median")
//             .style("visibility","visible");
//     }
    
//     // indiv points
//     var jitterWidth = 10
//     svg3
//     .selectAll("circle")
//     .data(albums_by_genre_f, d => {
//         return (d.Artists[0] + d.Album + d.Genre)})
//     .join(
//         enter => enter.append("circle")
//             .style('opacity', 0)
//             .attr("class","boxplot-points-genre")
//             .attr("id",d => d.Artists[0] + d.Album)
//             .attr("cx", d => {return(xScale(d.Genre) - jitterWidth/2 + Math.random()*jitterWidth)})
//             .attr("cy", d => {return(yScale(d.Score) - jitterWidth/2 + Math.random()*jitterWidth)})
//             .call(enter => enter.transition(t)
//             .attr("r", 4)
//             .style("fill", color1)
//             .style("opacity",0.2)
//             .attr("stroke", "black")
//             )
//         ,
//         update => update
//             .call(update => update.transition(t)
//             .attr("r", 4)
//             .style("fill", color1)
//             .style("opacity",0.2)
//             .attr("stroke", "black")
//             .attr("cx", d => {return(xScale(d.Genre) - jitterWidth/2 + Math.random()*jitterWidth)})
//             .attr("cy", d => {return(yScale(d.Score) - jitterWidth/2 + Math.random()*jitterWidth)})
//             )
//         ,
//         exit => exit
//         .call(exit => exit.transition(t)
//         .attr('r', 0)
//         .style('opacity', 0)
//         .remove()
//         )
//     )
//     if(!checked_graphs.includes('individual points')){
//         svg3.selectAll(".boxplot-points-genre")
//             .style("visibility","hidden");
//     }
//     else{
//         svg3.selectAll(".boxplot-points-genre")
//             .style("visibility","visible");
//     }
//     };

// // move fn
// d3.selection.prototype.moveToFront = function() {
//     return this.each(function(){
//       this.parentNode.appendChild(this);
//     });
//   };

// const onStat4Clicked = selection => {
//     stat4 = selection;
//     render_s4(stat4,num_reviews,num_artists)
// };
// const stats4 = ['Number of reviews',
//     'Highest Mean Score','Lowest Mean Score',
//     'Highest Median Score','Lowest Median Score',
//     'Highest Variance','Lowest Variance'];
// let stat4 = stats4[0];

// d3.select('#stats-menu4c')
//     .call(dropdownMenu,{
//     options: stats4,
//     onOptionClicked: onStat4Clicked,
//     selectedOption: stat4,
//     label: 'Sort Artist by: '
//     });

// const update_n_reviews = n => {
//     gba_quantiles_f = [];
//     gba_quantiles.forEach(a => {
//         if(parseInt(a.n) >= n){
//             gba_quantiles_f.push(a);
//         }
//     });
//     console.log('gba_quantiles_f',gba_quantiles_f)
// };

// const update_artists = artists_f => {
//     albums_by_artist_f = [];
//     albums_by_artist.forEach(a => {
//         if(artists_f.includes(a.Artist)){
//             albums_by_artist_f.push(a);
//         }
//     });
//     // console.log('albums_by_artist_f',albums_by_artist_f)
// };

// let num_reviews_input = document.getElementById('num-reviews-input');
// num_reviews_input.onchange = () => {
//     num_reviews = num_reviews_input.value
//     render_s4(stat4,parseInt(num_reviews),parseInt(num_artists));
// }
// let num_artists_input = document.getElementById('num-artists-input');
// num_artists_input.onchange = () => {
//     num_artists = num_artists_input.value
//     render_s4(stat4,parseInt(num_reviews),parseInt(num_artists));
// }

// // scores by artists
// const render_s4 = (stat4,n=2,a=10) => {
//     const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
//     var tooltip_a = d3.select("body")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

//     // filter by min n reviews
//     update_n_reviews(n);

//     let sortable = [];
//     const sort_desc = () => {sortable.sort(function(a, b) {
//         return b[1] - a[1]; // descending
//         });
//     };
//     const sort_asc = () => {sortable.sort(function(a, b) {
//         return a[1] - b[1]; // ascending
//         });
//     };
//     if(stat4 == "Number of reviews"){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.n,g.n])
//         );
//         sort_desc();
//     }
//     else if(stat4 == 'Highest Median Score'){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.median,g.n])
//         );
//         sort_desc();
//     }
//     else if(stat4 == 'Lowest Median Score'){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.median,g.n])
//         );
//         sort_asc();
//     }
//     else if(stat4 == 'Highest Mean Score'){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.mean,g.n])
//         );
//         sort_desc();
//     }
//     else if(stat4 == 'Lowest Mean Score'){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.mean,g.n])
//         );
//         sort_asc();
//     }
//     else if(stat4 == 'Highest Variance'){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.var])
//         ); 
//         sort_desc();
//     }
//     else if(stat4 == 'Lowest Variance'){
//         gba_quantiles_f.forEach(g =>
//             sortable.push([g.artist,g.var])
//         ); 
//         sort_asc();
//     }
//     sortable = sortable.slice(0,num_artists);
//     console.log('sortable',sortable);
//     artists_f = [];
//     sortable.forEach(a => {
//         artists_f.push(a[0])
//     });
//     update_artists(artists_f); // filter data by artists_f
//     // albums_by_artist
//     console.log('a_f',artists_f);

//     var svg4 = d3.select('#stat-svg4');
//     svg4
//         .style("width", config.vw + 'px')
//         .style("height", (config.vh + 60) + 'px');

//     // axes + scales
//     var xScale = d3.scaleBand()
//     .range([(config.vw - config.inner_vw * 0.95), config.inner_vw])
//     .domain(artists_f)
//     .paddingInner(1)
//     .paddingOuter(.5)
//     const xAxis = d3.axisBottom().scale(xScale);
//     svg4.append("g").attr('class','xaxis');
//     svg4.select('g.xaxis')
//         .attr("transform", "translate(0," + config.inner_vh + ")")
//         .transition(t)
//         .call(xAxis).selectAll("text")
//         .attr("y", 0)
//         .attr("x", 9)
//         .attr("dy", ".35em")
//         .attr("transform", "rotate(30)")
//         .style("text-anchor", "start");
//     const xLabel = svg4.append("text")
//         .attr("class", "xlabel");
//     svg4.select('.xlabel')
//         .attr("text-anchor", "left")
//         .attr("x", config.vw/2)
//         .attr("y", config.vh + 30)
//         .text('Artist');

//     var yScale = d3.scaleLinear()
//         .domain([-1,10])
//         .range([config.inner_vh, (config.vh - config.inner_vh * 0.95)])
//     svg4.append("g")
//         .attr("transform", "translate("+ (config.vw - config.inner_vw) +",0)")
//         .transition(t)
//         .call(d3.axisLeft(yScale))
//     const yLabel = svg4.append("text")
//         .attr("class", "ylabel");
//     svg4.select('.ylabel')
//         .attr("text-anchor", "middle")
//         .attr("x", -config.vh/2)
//         .attr("y",20)
//         .attr("transform", "rotate(-90)")
//         .text('Score');
//     // label size
//     d3.selectAll(".xaxis>.tick>text")
//     .each(function(d, i){
//         d3.select(this).style("font-size","13px");
//     });

//     // add points
//     var jitterWidth = 100/num_artists;
//     svg4
//         .selectAll("circle")
//         .data(albums_by_artist_f, d => {
//             return (d.Artist + d.Album)})
//         .join(
//             enter => enter.append("circle")
//                 .style('opacity', 0)
//                 .attr("class","boxplot-points-artist")
//                 .attr("id",d => d.Artist + d.Album)
//                 .attr("title",d => d.Album)
//                 .attr("cx", d => {return(xScale(d.Artist) - jitterWidth/2 + Math.random()*jitterWidth)})
//                 .attr("cy", d => {return(yScale(d.Score) - jitterWidth/2 + Math.random()*jitterWidth)})
//                 .on("mouseover", function(event,d) {
//                     tooltip_a.transition()
//                       .duration(200)
//                       .style("opacity", .8);
//                       tooltip_content = d.Album + ": " + d.Score;
//                     d3.select(this).moveToFront();
//                     tooltip_a.html(tooltip_content)
//                       .style("left", (event.pageX + 10) + "px")
//                       .style("top", (event.pageY) + "px");
//                 })
//                 .on("mouseout", function(d) {
//                 tooltip_a.transition()
//                     .duration(500)
//                     .style("opacity", 0);
//                 })
//                 .call(enter => enter.transition(t)
//                 .attr("r", 4)
//                 .style("fill", color1)
//                 .style("opacity",0.6)
//                 .attr("stroke", "black")
//                 )
//             ,
//             update => update
//                 .call(update => update.transition(t)
//                 .attr("r", 4)
//                 .style("fill", color1)
//                 .style("opacity",0.6)
//                 .attr("stroke", "black")
//                 .attr("cx", d => {return(xScale(d.Artist) - jitterWidth/2 + Math.random()*jitterWidth)})
//                 .attr("cy", d => {return(yScale(d.Score) - jitterWidth/2 + Math.random()*jitterWidth)})
//                 )
//             ,
//             exit => exit
//             .call(exit => exit.transition(t)
//             .attr('r', 0)
//             .style('opacity', 0)
//             .remove()
//             )
//         )
// };

// const group_by = key => array =>
//   array.reduce((objectsByKeyValue, obj) => {
//     const value = obj[key];
//     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
//     return objectsByKeyValue;
//   }, {});

// d3.csv('../static/data/the_needledrop_2021/fantano_7_15_21_albums.csv')
//     .then(data => {
//         data.forEach(d => {
//             d.Year = +d.Year; // year to numeric
//             d.Score = +d.Score; // year to numeric
//             d.Date = parseTime(d.Date); // format to date
//             d.Artists = d.Artists.split('<,>')
//             d.Genres = d.Genres.split(',')
//           });
//         console.log('raw data', data);
//         // init album datas
//         album_data1 = album_data = data;

//         // group albums by year
//         const group_by_year = group_by('Year');
//         albums_by_year = group_by_year(album_data)
//         for (const year in albums_by_year) {
//             let scores = albums_by_year[year].map(r => r.Score)
//             let total = 0;
//             for(var i = 0; i < scores.length; i++) {
//                 total += scores[i];
//             }
//             annual_average.push((total/scores.length).toFixed(2));
//           }
//         annual_avg_data = annual_average.map((score, index) => {
//             return {
//               Score: score,
//               Year: parseTime('1-Jan-' + (index + 12).toString())
//             }
//         });
//         annual_avg_data.shift();
//         // console.log(annual_avg_data);

//         // group albums by genre (1 row per genre)
//         album_data.forEach((album,i) => {
//             album.Genres.forEach((genre) => {
//                 let row = {...album_data[i]}; // deep copy
//                 row.Genre = genre;
//                 albums_by_genre.push(row);
//             });
//         });
//         grouped_by_genre = d3.group(albums_by_genre, d => d.Genre);
//         gbg_quantiles = d3.rollup(albums_by_genre, v => {
//             let Q1 = d3.quantile(v.map(g => { return g.Score;}).sort(d3.ascending),.25);
//             let median = d3.quantile(v.map(function(g) { return g.Score;}).sort(d3.ascending),.5);
//             let Q3 = d3.quantile(v.map(function(g) { return g.Score;}).sort(d3.ascending),.75);
//             let IQR = Q3 - Q1;
//             let min0 = d3.min(v.map(g => g.Score));
//             let max0 = d3.max(v.map(g => g.Score));
//             let min = Math.max(Q1 - 1.5 * IQR,d3.min(v.map(g => g.Score)));
//             let max = Math.min(Q3 + 1.5 * IQR,d3.max(v.map(g => g.Score)));
//             let mean = d3.mean(v.map(g => g.Score));
//             let variance = d3.variance(v.map(g => g.Score))
//             let n = v.length;
//             let genre = v.map(g => g.Genre)[0];
//             return({Q1: Q1, median: median, Q3: Q3, IQR: IQR, mean: mean, var: variance, min0: min0, max0:max0, min: min, max: max, n: n, genre: genre})
//         }, d => d.Genre);

//         gbg_quantiles.delete('');
//         console.log('genres', albums_by_genre);
//         console.log('genres_grouped', grouped_by_genre);
//         console.log('quantiles', gbg_quantiles);

//         // group albums by artist (1 row per artists)
//         album_data.forEach((album,i) => {
//             album.Artists.forEach((artist) => {
//                 let row = {...album_data[i]}; // deep copy
//                 row.Artist = artist;
//                 albums_by_artist.push(row);
//             });
//         });
//         let max_reviews = 0;
//         grouped_by_artist = d3.group(albums_by_artist,d => d.Artist);
//         gba_quantiles = d3.rollup(albums_by_artist, v => {
//             let scores = v.map(g => g.Score);
//             let Q1 = d3.quantile(v.map(g => { return g.Score;}).sort(d3.ascending),.25);
//             let median = d3.quantile(v.map(function(g) { return g.Score;}).sort(d3.ascending),.5);
//             let Q3 = d3.quantile(v.map(function(g) { return g.Score;}).sort(d3.ascending),.75);
//             let IQR = Q3 - Q1;
//             let min0 = d3.min(v.map(g => g.Score));
//             let max0 = d3.max(v.map(g => g.Score));
//             let min = Math.max(Q1 - 1.5 * IQR,d3.min(v.map(g => g.Score)));
//             let max = Math.min(Q3 + 1.5 * IQR,d3.max(v.map(g => g.Score)));
//             let mean = d3.mean(v.map(g => g.Score));
//             let variance = d3.variance(v.map(g => g.Score))
//             let n = v.length;
//             if (n > max_reviews){
//                 max_reviews = n;
//             }
//             let artist = v.map(g => g.Artist)[0];
//             return({scores: scores, Q1: Q1, median: median, Q3: Q3, IQR: IQR, mean: mean, var: variance, min0: min0, max0:max0, min: min, max: max, n: n, artist: artist})
//         }, d => d.Artist)
//         console.log('max reviews',max_reviews);
//         console.log('artist',albums_by_artist)
//         console.log('artists_grouped',grouped_by_artist)
//         console.log('quantiles',gba_quantiles)

//         // render graphs
//         // render_s1(stat1);
//         // render_s2();
//         // render_s3(stat3);
//         // render_s4(stat4);

//         // label size
//         d3.selectAll(".xaxis>.tick>text")
//             .each(function(d, i){
//                 d3.select(this).style("font-size","13px");
//         });
//     }
//     )