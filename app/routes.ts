import { type RouteConfig, index,layout,route } from "@react-router/dev/routes";

export default [index("routes/home.tsx")
    ,route("about","routes/About.tsx")
    ,route("post/:postId","routes/Post.tsx")
    ,layout("routes/dashboard.tsx",
        [
        route("finances/:id","routes/Finances.tsx"),
        route("personalInfo","routes/personal-info.tsx")
        ])
] satisfies RouteConfig;
