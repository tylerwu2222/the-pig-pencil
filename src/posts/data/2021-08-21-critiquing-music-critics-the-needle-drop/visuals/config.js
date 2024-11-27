const w_width = window.innerWidth, w_height = window.innerHeight;
const article_width = (w_width <= 1080) ? 0.95 : 0.6; // ternary operator
const article_height = 0.75;
const padding_v = 60, padding_h = 60;
const config = {
    "vw": article_width * w_width,
    "vh": article_height * w_height,
    "small_vh": article_height * w_height * 0.8,
    "inner_vw": article_width * w_width - padding_h,
    "inner_vh": article_height * w_height - padding_v,
    "small_inner_vh": article_height * w_height * 0.8 - padding_v,
    "anim_speed": 3000,
    "color1": "#FCF281",
    "stroke1": "#262626"
}

export default config;