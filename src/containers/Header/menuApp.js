export const adminMenu = [
  {
    //hệ thống
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.user-manage",
      //   link: "/system/user-manage",
      //   // subMenus: [
      //   //   {
      //   //     name: "menu.system.system-administrator.manage-doctor",
      //   //     link: "/system/user-manage",
      //   //   },
      //   //   {
      //   //     name: "menu.system.system-administrator.manage-admin",
      //   //     link: "/system/user-redux",
      //   //   },
      //   // ],
      // },
      {
        name: "menu.admin.manage-admin",
        link: "/system/manage-admin",
      },
      {
        name: "menu.admin.manage-doctor.menu",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
