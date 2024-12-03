'use client'
const w_width = window.innerWidth, w_height = window.innerHeight;
const article_width = (w_width <= 1080) ? 0.95 : 0.6;
// const article_width = (w_width <= 450) ? 0.95 : 0.6;
const article_height = 0.75; // ternary operator
const padding_v = 60, padding_h = 40;
export const config = {
    "node_size": Math.max(30, (article_width * w_height - padding_v) / 16),
    "vw": article_width * w_width,
    "vh": article_height * w_height,
    "inner_vw": article_width * w_width - padding_h,
    "inner_vh": article_height * w_height - padding_v,
    "anim_speed": 3000,
    "colors": ['#969696', '#88c282', '#abc27d', '#bfc27a', '#c29975', '#c28072', '#3b2e2b']
};
export const initialCC = {
    'VU': 0,
    'CR': 0,
    'EN': 0,
    'EX': 0,
    'NE': 0,
    'LC': 0,
    'NT': 0
};
// let cs_counts;
export const initialHC = {
    'tropical forest': 0,
    'deciduous forest': 0,
    'savanna': 0,
    'grassland': 0,
    'coastal': 0,
    'desert': 0,
    'mountain': 0,
    'island': 0
};
// let habitat_counts;

export const cs_key = {
    'NE': 'Not Evaluated',
    'LC': 'Least Concern',
    'NT': 'Near Threatened',
    'VU': 'Vulnerable',
    'EN': 'Endangered',
    'CR': 'Critically Endangered',
    'EX': 'Extinct'
}

export const cs_mapping = Object.entries(cs_key).map(function (x, i) {
    return {
        abbr: x[0],
        full: x[1],
        color: config.colors[i]
    };
});