export const routesPath = {
  main: {
    path: "/",
  },
  auth: {
    path: "/auth/*",
    children: {
      login: {
        path: "/login",
      },
      redirect: {
        path: "/redirect",
      },
    },
  },
  register: {
    path: "/register/",
  },
  movie: {
    path: "/movie/:id",
  },
  profile: {
    path: "/profile/:id",
  },
  sessions: {
    path: "/sessions",
  },
} as const;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type NestedKeyof<T> = T extends object
  ? { [K in keyof T]: K | NestedKeyof<T[K]> }[keyof T]
  : never;

type TRoutesLeaves = Leaves<typeof routesPath>;

export const getLinkPath = <T extends TRoutesLeaves>(
  path: T,
  params?: object
) => {
  const arrishPath = path.split(".") as NestedKeyof<typeof routesPath>[];
  let routesPathCopy = JSON.parse(JSON.stringify(routesPath));
  return arrishPath.reduce((link, objectKey) => {
    const instance = routesPathCopy[objectKey];
    if (typeof instance === "string") {
      if (!params) {
        return link;
      }
      return Object.entries(params).reduce((currentLink, [key, value]) => {
        return currentLink.replace(`:${key}`, value);
      }, link);
    }
    if ("path" in instance) {
      const normalizePath = instance.path.replaceAll("*", "");
      routesPathCopy = routesPathCopy[objectKey];
      return `${link}${normalizePath}`.replace(/(\/)(?=(\/)*\1)/g, "");
    }
    routesPathCopy = routesPathCopy[objectKey];
    return link;
  }, "");
};
