const w_width = window.innerWidth, w_height = window.innerHeight;

// turn into dynamic function
export default function config_builder(
    article_horizontal_ratio = (w_width <= 768) ? 0.95 : 0.6,
    article_vertical_ratio = 0.75,
    padding_vertical = 80,
    padding_horizontal = 100,
    anim_speed = 3000,
    stroke = "#000",
    fill = "#999"
) {

    const total_w = article_horizontal_ratio * w_width;
    const total_h = article_vertical_ratio * w_height;

    const dynamic_config = {
        "anim_speed": anim_speed,
        "anim_speed_fast": anim_speed / 2,

        "stroke": stroke,
        "fill": fill,

        "padding_v": padding_vertical,
        "padding_h": padding_horizontal,

        "total_w": total_w,
        "total_h": total_h,
        "smaller_total_w": total_w * 0.8,
        "smaller_total_h": total_h * 0.8,

        "inner_w": total_w - padding_horizontal,
        "inner_h": total_h - padding_vertical,
        "small_inner_w": total_w * 0.8 - padding_horizontal,
        "small_inner_h": total_h * 0.8 - padding_vertical,

        "x_axis_start": padding_horizontal / 2,
        "x_axis_end": total_w - padding_horizontal / 2,
        "y_axis_start": padding_vertical / 2,
        "y_axis_end": total_h - padding_vertical / 2,

    };
    return dynamic_config;
}