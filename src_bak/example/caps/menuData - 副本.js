export default [{
    id: "T01",
    name: "风云卫星",
    subtitle: "FengYun Sate",
    childs: [
      
        {
          id: "T01-M01-S01",
          name: "真彩色",
          subtitle: "NatureColor_NoLit",
          element: "NatureColor_NoLit",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S02",
          name: "自然色",
          subtitle: "Natural Color RGB Composite (From WMO)",
          element: "Natural",
          legend: "./img/legend/color_bar_1670_Natural_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S03",
          name: "沙尘",
          subtitle: "Dust RGB Composite (From WMO)",
          element: "Ash",
          legend: "./img/legend/color_bar_1670_dust_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S04",
          name: "气团",
          subtitle: "AirMass RGB Composite (From WMO)",
          element: "AirMass",
          legend: "./img/legend/color_bar_1670_air_mass_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S05",
          name: "雾/雪",
          subtitle: "Fog/Snow RGB Composite (From WMO)",
          element: "FogSnow",
          legend: "./img/legend/color_bar_1670_fog_snow_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S06",
          name: "强风暴",
          subtitle: "Severe Storms RGB Composite (From WMO)",
          element: "SevereStorms",
          legend: "./img/legend/color_bar_1670_severe_stroms_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S07",
          name: "对流云",
          subtitle: "CloudsConvection RGB Composite (From WMO)",
          element: "CloudsConvection",
          legend: "./img/legend/color_bar_1670_clouds_convection_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S08",
          name: "白天对流风暴",
          subtitle: "Day Convective Storms RGB Composite (From WMO)",
          element: "Convection",
          legend: "./img/legend/color_bar_1670_day_convective_storms_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S09",
          name: "白天微物理特征",
          subtitle: "Day Microphysics RGB Composite (From WMO)",
          element: "DayMicrophysics",
          legend: "./img/legend/color_bar_1670_day_microphysics_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }, {
          id: "T01-M01-S10",
          name: "夜间微物理特征",
          subtitle: "Night Microphysics RGB Composite (From WMO)",
          element: "NightMicrophysics",
          legend: "./img/legend/color_bar_1670_night_microphysics_en.png",
          supertype: "15",
          dataCode: "fy-4a"
        }
      } 
    ]
  }, {
    id: "T03",
    name: "雷达",
    subtitle: "Radar Observe",
    childs: [
      {
        id: "T04-M01",
        name: "组网拼图",
        subtitle: "Radar Networking",
        childs: [
          {
            id: "T04-M01-S01",
            name: "组合反射率",
            subtitle: "Composite reflectivity",
            element: "CR",
            supertype: 14,
            dataCode: "radar"
          }, {
            id: "T04-M01-S01",
            name: "垂直液态水含量",
            subtitle: "Vertically Liquid Water Content",
            element: "VAWC",
            supertype: 14,
            dataCode: "radar"
          }
        ]
      }, {
        id: "T04-M01",
        name: "单站雷达",
        subtitle: "Monostatic Radar",
        childs: [
          {
            id: "T04-M01-S01",
            name: "伊斯坦布尔",
            subtitle: "Islamabad Radar",
            element: "Islamabad",
            dataCode: "radar"
          }, {
            id: "T04-M01-S02",
            name: "拉合尔",
            subtitle: "Lahore Radar",
            element: "Lahore",
            dataCode: "radar"
          }, {
            id: "T04-M01-S03",
            name: "曼格拉",
            subtitle: "Mangla Radar",
            element: "Mangla",
            dataCode: "radar"
          }, {
            id: "T04-M01-S04",
            name: "拉希姆亚尔汗",
            subtitle: "Rahim Yar Khan Radar",
            element: "RYK",
            dataCode: "radar"
          }, {
            id: "T04-M01-S05",
            name: "德拉伊斯梅尔汗",
            subtitle: "Dera Ismail Khan Radar",
            element: "DIK",
            dataCode: "radar"
          }, {
            id: "T04-M01-S06",
            name: "锡亚尔科特",
            subtitle: "Sialkot Radar",
            element: "Sialkot",
            dataCode: "radar"
          }, {
            id: "T04-M01-S07",
            name: "马尔丹",
            subtitle: "Mardan Radar",
            element: "Mardan",
            dataCode: "radar"
          }, {
            id: "T04-M01-S08",
            name: "卡拉奇",
            subtitle: "Karachi Radar",
            element: "Karachi",
            dataCode: "radar"
          }
        ]
      }
    ]
  }, {
    id: "T04",
    name: "地面实况",
    subtitle: "Surface",
    childs: [
      {
        id: "T04-M01",
        name: "气象观测站",
        subtitle: "Surface Meteorological Stations",
        childs: [
          {
            id: "T04-M01-S01",
            name: "气温",
            subtitle: "2m-Temperature",
            element: "TEM",
            legend: "TEM",
            supertype: "4",
            dataCode: "station"
          }, {
            id: "T04-M01-S03",
            name: "降水",
            subtitle: "Precipitation",
            legend: "PRE_1h",
            element: "TEM",
            supertype: "4",
            dataCode: "station"
          }, {
            id: "T04-M01-S02",
            name: "风",
            subtitle: "10m wind",
            element: "TEM",
            supertype: "4",
            dataCode: "station"
          }
        ]
      }, {
        id: "T04-M02",
        name: "CMA实况",
        subtitle: "CMA-RA",
        childs: [
          {
            id: "T04-M02-S01",
            name: "2米气温",
            subtitle: "2m-Temperature",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S02",
            name: "2米气温异常",
            subtitle: "Precipitation",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S03",
            name: "降水",
            subtitle: "Precipitation anomaly",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S04",
            name: "降水异常",
            subtitle: "Channel 5: Visable 0.55~0.9 μm",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S05",
            name: "10米风",
            subtitle: "10m wind",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M01-S06",
            name: "海平面气压",
            subtitle: "MSLP",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M01-S07",
            name: "位势高度异常",
            subtitle: "Geopotential height anomaly",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M01-S08",
            name: "气温异常",
            subtitle: "Temperature anomaly",
            element: "TEM",
            dataCode: "fy-2h"
          }
        ]
      }
    ]
  }, {
    id: "T01",
    name: "数值模式",
    subtitle: "Models",
    childs: [
      {
        id: "T01-M01",
        name: "动力类",
        subtitle: "Power Category",
        sort: 1,
        childs: [
          {
            id: "T01-M01-S01",
            name: "位势高度",
            subtitle: "Geopotential height",
            sort: 1,
            element: "GPH",
            legend: "GPH_2",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            defaultLevel: 2,
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M01-S02",
            name: "气压",
            subtitle: "Pressure",
            sort: 1,
            element: "PRS",
            legend: "PRS",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            defaultLevel: 0,
            maplayer: "",
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M01-S03",
            name: "10米风",
            subtitle: "10m wind",
            element: "WIU,WIV",
            legend: "WIN",
            sort: 1,
            supertype: "12",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            menulevel: 1,
            defaultLevel: 10,
            status: "0",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "10"
          }, {
            id: "T01-M01-S04",
            name: "海平面气压",
            subtitle: "Pressure reduced to MSL",
            sort: 1,
            element: "SSP",
            legend: "PRS",
            menutype: "1",
            maplayer: "",
            menulevel: 1,
            defaultLevel: 10,
            status: "0",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "500,700,850"
          }
        ]
      }, {
       id: "T01-M02",
       name: "降水类",
       subtitle: "Precipitation Category",
       childs: [
          {
            id: "T01-M02-S01",
            name: "总降水",
            subtitle: "Precipitation",
            sort: 1,
            element: "PRE",
            legend: "PRE_3h",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            defaultLevel: 0,
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M02-S02",
            name: "大尺度降水",
            subtitle: "Precipitation",
            sort: 1,
            element: "LPE",
            legend: "PRE_3h",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            defaultLevel: 0,
            maplayer: "",
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M01-S03",
            name: "对流性降水",
            subtitle: "Precipitation",
            sort: 1,
            element: "CPE",
            legend: "PRE_3h",
            supertype: "9",
            menutype: "1",
            maplayer: "",
            menulevel: 1,
            defaultLevel: 0,
            status: "0",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "10"
          }
       ]
     }, {
       id: "T01-M03",
       name: "热力类",
       subtitle: "Thermal Category",
       childs: [
          {
            id: "T01-M03-S01",
            name: "气温",
            subtitle: "Temperature",
            sort: 1,
            element: "TEM",
            legend: "TEM_K",
            supertype: "5",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            defaultLevel: 2,
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M03-S02",
            name: "最高气温",
            subtitle: "Maximum temperature",
            sort: 1,
            element: "TEM",
            legend: "TEM",
            supertype: "5",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            defaultLevel: 0,
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M03-S03",
            name: "最低气温",
            subtitle: "Minimum temperature",
            sort: 1,
            element: "MNT",
            legend: "TEM",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            defaultLevel: 0,
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M03-S04",
            name: "露点温度",
            subtitle: "Dewpoint temperature",
            sort: 1,
            element: "DPT",
            legend: "TEM",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            defaultLevel: 0,
            maplayer: "",
            menulevel: 1,
            status: "0"
          }
       ]
     }, {
       id: "T01-M04",
       name: "水汽类",
       subtitle: "Water Vapour Category",
       childs: [
          {
            id: "T04-M01-S01",
            name: "比湿",
            subtitle: "Specific humidity",
            element: "SSH",
            legend: "SSH",
            supertype: "5",
            defaultLevel: 0,
            dataCode: "CMA_GFS",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "0"
          }, {
            id: "T04-M01-S02",
            name: "相对湿度",
            subtitle: "Relative humidity",
            element: "RHU",
            legend: "RHU",
            supertype: "5",
            defaultLevel: 0,
            dataCode: "CMA_GFS",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "0"
          }
        ]
      }, {
       id: "T01-M06",
       name: "水汽类",
       subtitle: "Water Vapour Category",
       childs: [
          {
             id: "T01-M06-S01",
             name: "对流有效位能",
             subtitle: "Convective effective potential energy",
             element: "CEPE",
             legend: "Cloud",
             supertype: "11",
             dataCode: "CMA_GFS",
             timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
             levelinterlaber: "",
             levelinterval: "0"
           }, {
             id: "T01-M06-S02",
             name: "K指数",
             subtitle: "K Index",
             element: "LCC",
             legend: "Cloud",
             supertype: "11",
             dataCode: "CMA_GFS",
             timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
             levelinterlaber: "",
             levelinterval: "0"
           }, {
             id: "T01-M06-S02",
             name: "最佳抬升指数",
             subtitle: "Best (4 layer) Lifted Index",
             element: "LCC",
             legend: "Cloud",
             supertype: "11",
             dataCode: "CMA_GFS",
             timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
             levelinterlaber: "",
             levelinterval: "0"
           }
        ]
      }
    ]
  }, {
    id: "T02",
    name: "850百帕",
    subtitle: "850 hpa",
    childs: []
  }, {
    id: "T03",
    name: "700百帕",
    subtitle: "700 hpa",
    childs: []
  }, {
    id: "T04",
    name: "500百帕",
    subtitle: "500 hpa",
    childs: [
      {
        id: "T01-M01",
        name: "动力类",
        subtitle: "Power Category",
        sort: 1,
        childs: [
          {
            id: "T01-M01-S01",
            name: "位势高度",
            subtitle: "GPH",
            sort: 1,
            element: "GPH",
            legend: "GPH",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            maplayer: "",
            defaultLevel: 50000,
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M01-S02",
            name: "海平面气压",
            subtitle: "PRS",
            sort: 1,
            element: "PRS",
            legend: "PRS",
            supertype: "9",
            dataCode: "CMA_GFS",
            menutype: "1",
            defaultLevel: 0,
            maplayer: "",
            menulevel: 1,
            status: "0"
          }, {
            id: "T01-M03",
            name: "500百帕风场",
            subtitle: "500 hpa wind",
            sort: 1,
            supertype: "12",
            menutype: "1",
            maplayer: "",
            menulevel: 1,
            defaultLevel: 50000,
            status: "0",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "10"
          }, {
            id: "T01-M04",
            name: "风",
            subtitle: "U,V",
            sort: 1,
            menutype: "1",
            maplayer: "",
            menulevel: 1,
            defaultLevel: 10,
            status: "0",
            timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
            levelinterlaber: "",
            levelinterval: "500,700,850"
          }
        ]
      }, {
       id: "T02",
       name: "降水类",
       subtitle: "Precipitation Category",
       childs: [
         {
           id: "T02-M01",
           name: "",
           subtitle: "",
           sort: 1,
           menutype: "1",
           maplayer: "",
           menulevel: 1,
           status: "0",
           childs: [
             {
               id: "T01-M01-S01",
               name: "24小时降水",
               subtitle: "Precipitation 24h",
               element: "PRE",
               legend: "PRE_24h",
               supertype: "11",
               dataCode: "CMA_GFS",
               defaultLevel: 0,
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T01-M01-S02",
               name: "12小时降水",
               subtitle: "Precipitation 12h",
               element: "PRE",
               legend: "PRE_12h",
               supertype: "11",
               dataCode: "CMA_GFS",
               defaultLevel: 0,
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T01-M01-S03",
               name: "6小时降水",
               subtitle: "Precipitation 6h",
               element: "PRE",
               legend: "PRE_6h",
               supertype: "11",
               dataCode: "CMA_GFS",
               defaultLevel: 0,
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T01-M01-S04",
               name: "3小时降水",
               subtitle: "Precipitation 3h",
               element: "PRE",
               legend: "PRE_3h",
               supertype: "11",
               dataCode: "CMA_GFS",
               defaultLevel: 0,
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }
           ]
         }
       ]
     }, {
       id: "T01-M03",
       name: "热力类",
       subtitle: "Thermal Category",
       childs: [
         {
           id: "T03-M01",
           name: "",
           subtitle: "",
           sort: 1,
           menutype: "1",
           maplayer: "",
           menulevel: 1,
           status: "0",
           childs: [
             {
               id: "T03-M01-S02",
               name: "温度",
               en_name: "Tem_3h",
               subtitle: "Temperature 3h",
               element: "TEM",
               legend: "TEM_K",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               defaultLevel: 2,
               levelinterval: "0"
             }, {
               id: "T03-M01-S02",
               name: "24h变温",
               subtitle: "Temperature 24h",
               element: "TEM_ChANGE_24h",
               legend: "TEMC",
               supertype: "11",
               dataCode: "CMA_GFS",
               defaultLevel: 2,
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T03-M01-S03",
               name: "温度平流",
               subtitle: "Temperature advection",
               element: "TEAD",
               legend: "TEAD",
               supertype: "11",
               dataCode: "CMA_GFS",
               defaultLevel: 2,
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }
           ]
         }
       ]
     }, {
       id: "T01-M04",
       name: "水汽类",
       subtitle: "Water Vapour Category",
       childs: [
         {
           id: "T04-M01",
           name: "",
           subtitle: "",
           sort: 1,
           menutype: "1",
           maplayer: "",
           menulevel: 1,
           status: "0",
           childs: [
             {
               id: "T04-M01-S04",
               name: "比湿",
               subtitle: "Temperature 3h",
               element: "TEM",
               legend: "TEM",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T04-M01-S04",
               name: "相对湿度",
               subtitle: "Temperature 24h",
               element: "TEM_ChANGE_24h",
               legend: "TEMC",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T04-M01-S04",
               name: "水汽通量",
               subtitle: "Temperature advection",
               element: "TEAD",
               legend: "TEAD",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T04-M01-S04",
               name: "水汽通散度",
               subtitle: "Temperature advection",
               element: "TEAD",
               legend: "TEAD",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }
           ]
         }
       ]
     }, {
       id: "T01-M05",
       name: "云量类",
       subtitle: "Cloud Category",
       childs: [
         {
           id: "T05-M01",
           name: "",
           subtitle: "",
           sort: 1,
           menutype: "1",
           maplayer: "",
           menulevel: 1,
           status: "0",
           childs: [
             {
               id: "T05-M01-S01",
               name: "总云量",
               subtitle: "Total Cloud Cover",
               element: "TCC",
               legend: "Cloud",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }, {
               id: "T04-M01-S02",
               name: "相对湿度",
               subtitle: "Low Cloud Cover",
               element: "LCC",
               legend: "Cloud",
               supertype: "11",
               dataCode: "CMA_GFS",
               timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
               levelinterlaber: "",
               levelinterval: "0"
             }
           ]
         }
       ]
     }, {
       id: "T01-M06",
       name: "指数类",
       subtitle: "Instability Index Category",
       childs: [
         
       ]
     }
    ]
  }
]
