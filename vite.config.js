import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({

  plugins:[

    react(),

    VitePWA({

      registerType: "autoUpdate",

      includeAssets: [
        "pbl-logo.jpg"
      ],


      manifest: {

        name: "PBL Plants Admin",

        short_name: "PBL Admin",

        description:
          "PBL Plants Management Dashboard",


        theme_color:
          "#245c3a",


        background_color:
          "#ffffff",


        display:
          "standalone",


        start_url:
          "/admin",


        icons:[

          {
            src:"/pbl-logo.jpg",
            sizes:"192x192",
            type:"image/jpg"
          },

          {
            src:"/pbl-logo.jpg",
            sizes:"512x512",
            type:"image/jpg"
          }

        ]

      }

    })

  ]

})