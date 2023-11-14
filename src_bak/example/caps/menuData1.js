export default [{
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
