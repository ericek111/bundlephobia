const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )
const { writeFileSync } = require('fs')
const path = require('path')

// Source: https://analytics.amplitude.com/bundlephobia/chart/3tbq2vm/edit/jmy3u6h
const popularPackages = [
  "react",
  "moment",
  "lodash",
  "react-dom",
  "axios",
  "@material-ui/core",
  "date-fns",
  "dayjs",
  "vue",
  "redux",
  "react-query",
  "swiper",
  "react-hook-form",
  "styled-components",
  "formik",
  "framer-motion",
  "yup",
  "angular",
  "antd",
  "preact",
  "react-spring",
  "rxjs",
  "jquery",
  "chart.js",
  "firebase",
  "glider-js",
  "chroma-js",
  "react-select",
  "@google/model-viewer",
  "bootstrap",
  "react-redux",
  "@apollo/client",
  "three",
  "luxon",
  "uuid",
  "tailwindcss",
  "swr",
  "mobx",
  "react-slick",
  "d3",
  "react-router-dom",
  "@angular/core",
  "recoil",
  "immer",
  "express",
  "classnames",
  "react-datepicker",
  "recharts",
  "svelte",
  "@chakra-ui/react",
  "react-final-form",
  "xstate",
  "zustand",
  "slick-carousel",
  "next",
  "@reduxjs/toolkit",
  "react-transition-group",
  "ramda",
  "gsap",
  "lodash-es",
  "query-string",
  "emotion",
  "react-beautiful-dnd",
  "react-router",
  "react-dnd",
  "react-bootstrap",
  "react-window",
  "@react-google-maps/api",
  "qs",
  "react-motion",
  "joi",
  "slate",
  "moment-timezone",
  "chartist",
  "react-i18next",
  "react-table",
  "react-virtualized",
  "lottie-web",
  "node-fetch",
  "@emotion/styled",
  "react-toastify",
  "xlsx",
  "i18next",
  "flickity",
  "@emotion/react",
  "@material-ui/styles",
  "animejs",
  "react-intl",
  "@hookstate/core",
  "dompurify",
  "@popperjs/core",
  "graphql",
  "highcharts",
  "js-cookie",
  "vuetify",
  "clsx",
  "@sentry/browser",
  "draft-js",
  "zod",
  "material-ui",
  "superstruct",
  "downshift",
  "redux-saga",
  "@headlessui/react",
  "redux-thunk",
  "nanoid",
  "libphonenumber-js",
  "redux-toolkit",
  "react-markdown",
  "react-day-picker",
  "react-use",
  "urql",
  "quill",
  "@material-ui/icons",
  "react-modal",
  "marked",
  "react-icons",
  "momentjs",
  "ajv",
  "jspdf",
  "react-dropzone",
  "react-popper",
  "jotai",
  "react-tooltip",
  "sanitize-html",
  "crypto-js",
  "react-move",
  "react-helmet",
  "apexcharts",
  "react-chartjs-2",
  "react-multi-carousel",
  "fuse.js",
  "alpinejs",
  "aws-sdk",
  "react-intersection-observer",
  "react-responsive-modal",
  "core-js",
  "tippy.js",
  "react-responsive-carousel",
  "react-dates",
  "popper.js",
  "graphql-request",
  "frappe-charts",
  "exceljs",
  "chartjs",
  "react-form",
  "vuex",
  "uplot",
  "date-fns-tz",
  "phin",
  "react-player",
  "keen-slider",
  "underscore",
  "final-form",
  "@angular/material",
  "react-number-format",
  "immutable",
  "xss",
  "chakra-ui",
  "lodash.debounce",
  "typescript",
  "echarts",
  "bulma",
  "jsonschema",
  "@xstate/react",
  "react-pdf",
  "got",
  "victory",
  "lazysizes",
  "validator",
  "lit-html",
  "effector",
  "numeral",
  "lit-element",
  "mobx-react",
  "polished"
]

const otherPages = ['', '/scan']

const links = [
  ...otherPages.map(page => ({
    url: page,
    changefreq: 'weekly',
    priority: 1
  })),
  ...popularPackages.map(package => ({
    url: `/package/${package}`,
    changefreq: 'weekly',
    priority: 0.7
  })),
]

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://bundlephobia.com' } )

// Return a promise that resolves with your XML string
const sitemapPromise = streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  data.toString()
)

sitemapPromise
  .then((sitemap) => {
  writeFileSync(path.join(__dirname, '..', 'client', 'assets', 'public', 'sitemap.xml'), sitemap, 'utf8')
})
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
