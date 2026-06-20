"use client"

import React, { useState } from "react"
import Link from "next/link"
import { BarChart3, AlertTriangle, ShieldCheck, MapPin, Search, ArrowRight } from "lucide-react"

// TypeScript Interfaces
interface DistrictCase {
  name: string;
  cases: number;
}

interface ProvinceData {
  province: string;
  districts: DistrictCase[];
}

interface YearlyWPV1 {
  year: number;
  totalCases: number;
  totalDistricts: number;
  provinces: ProvinceData[];
}

interface cVDPV2Row {
  province: string;
  district: string;
  cases2019: number | string;
  cases2020: number | string;
  cases2021: number | string;
}

// 1. WPV1 Polio Cases Dataset (2019 - 2026)
const wpv1Data: YearlyWPV1[] = [
  {
    year: 2026,
    totalCases: 3,
    totalDistricts: 3,
    provinces: [
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "Bannu", cases: 1 },
          { name: "North Waziristan", cases: 1 }
        ]
      },
      {
        province: "SINDH",
        districts: [
          { name: "Sujawal", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2025,
    totalCases: 31,
    totalDistricts: 15,
    provinces: [
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "North Waziristan", cases: 5 },
          { name: "Lakki Marwat", cases: 4 },
          { name: "Tank", cases: 4 },
          { name: "Bannu", cases: 3 },
          { name: "Torghar", cases: 2 },
          { name: "D.I. Khan", cases: 1 },
          { name: "Kohistan Lower", cases: 1 }
        ]
      },
      {
        province: "SINDH",
        districts: [
          { name: "Badin", cases: 3 },
          { name: "Thatta", cases: 2 },
          { name: "Hyderabad", cases: 1 },
          { name: "Kambar", cases: 1 },
          { name: "Larkana", cases: 1 },
          { name: "Umerkot", cases: 1 }
        ]
      },
      {
        province: "PUNJAB",
        districts: [
          { name: "Mandi Bahauddin", cases: 1 }
        ]
      },
      {
        province: "GILGIT-BALTISTAN",
        districts: [
          { name: "Diamer", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2024,
    totalCases: 74,
    totalDistricts: 34,
    provinces: [
      {
        province: "BALOCHISTAN",
        districts: [
          { name: "Killah Abdullah", cases: 7 },
          { name: "Quetta", cases: 3 },
          { name: "Zhob", cases: 3 },
          { name: "Chaman", cases: 2 },
          { name: "Killa Saifullah", cases: 2 },
          { name: "Jaffarabad", cases: 2 },
          { name: "Dera Bugti", cases: 1 },
          { name: "Chagai", cases: 1 },
          { name: "Jhal Magsi", cases: 1 },
          { name: "Kharan", cases: 1 },
          { name: "Pishin", cases: 2 },
          { name: "Noshki", cases: 1 },
          { name: "Loralai", cases: 1 }
        ]
      },
      {
        province: "SINDH",
        districts: [
          { name: "Jacobabad", cases: 5 },
          { name: "Karachi Keamari", cases: 3 },
          { name: "Shikarpur", cases: 2 },
          { name: "Kashmore", cases: 2 },
          { name: "Hyderabad", cases: 2 },
          { name: "Karachi East", cases: 2 },
          { name: "Sujawal", cases: 1 },
          { name: "Karachi Malir", cases: 1 },
          { name: "Mirpur Khas", cases: 1 },
          { name: "Sanghar", cases: 1 },
          { name: "Ghotki", cases: 1 },
          { name: "Sukkur", cases: 1 },
          { name: "Thatta", cases: 1 }
        ]
      },
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "D.I. Khan", cases: 11 },
          { name: "Tank", cases: 5 },
          { name: "Kohat", cases: 2 },
          { name: "Lakki Marwat", cases: 2 },
          { name: "Mohmand", cases: 1 },
          { name: "Nowshera", cases: 1 }
        ]
      },
      {
        province: "PUNJAB",
        districts: [
          { name: "Chakwal", cases: 1 }
        ]
      },
      {
        province: "ISLAMABAD (ICT)",
        districts: [
          { name: "Islamabad", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2023,
    totalCases: 1,
    totalDistricts: 1,
    provinces: [
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "Bannu", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2022,
    totalCases: 20,
    totalDistricts: 3,
    provinces: [
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "North Waziristan", cases: 17 },
          { name: "Lakki Marwat", cases: 2 },
          { name: "South Waziristan", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2021,
    totalCases: 1,
    totalDistricts: 1,
    provinces: [
      {
        province: "BALOCHISTAN",
        districts: [
          { name: "Killa Abdullah", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2020,
    totalCases: 84,
    totalDistricts: 39,
    provinces: [
      {
        province: "BALOCHISTAN",
        districts: [
          { name: "Pishin", cases: 6 },
          { name: "Quetta", cases: 5 },
          { name: "Killa Abdullah", cases: 3 },
          { name: "Nasirabad", cases: 2 },
          { name: "Zhob", cases: 2 },
          { name: "Chagai", cases: 1 },
          { name: "Dukki", cases: 1 },
          { name: "Jaffarabad", cases: 1 },
          { name: "Jhal Magsi", cases: 1 },
          { name: "Killa Saifullah", cases: 1 },
          { name: "Mastung", cases: 1 },
          { name: "Sibi", cases: 1 },
          { name: "Sohbatpur", cases: 1 }
        ]
      },
      {
        province: "SINDH",
        districts: [
          { name: "Ghotki", text: "Ghotki", cases: 4 },
          { name: "Jacobabad", cases: 4 },
          { name: "Kambar", cases: 3 },
          { name: "Kashmore", cases: 2 },
          { name: "Naushero Feroze", cases: 2 },
          { name: "Badin", cases: 1 },
          { name: "Khi. Landhi", cases: 1 },
          { name: "Khairpur", cases: 1 },
          { name: "Larkana", cases: 1 },
          { name: "Shikarpur", cases: 1 },
          { name: "Sujawal", cases: 1 },
          { name: "Tando Allahyar", cases: 1 }
        ]
      },
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "Lakki Marwat", cases: 12 },
          { name: "Tank", cases: 4 },
          { name: "Karak", cases: 2 },
          { name: "South Waziristan", cases: 2 },
          { name: "Bannu", cases: 1 },
          { name: "Peshawar", cases: 1 }
        ]
      },
      {
        province: "PUNJAB",
        districts: [
          { name: "D.G. Khan", cases: 5 },
          { name: "Bahawalpur", cases: 2 },
          { name: "Lahore", cases: 2 },
          { name: "Layyah", cases: 1 },
          { name: "Muzaffargarh", cases: 1 },
          { name: "Rahim Yar Khan", cases: 1 },
          { name: "Rajanpur", cases: 1 },
          { name: "Vehari", cases: 1 }
        ]
      }
    ]
  },
  {
    year: 2019,
    totalCases: 147,
    totalDistricts: 43,
    provinces: [
      {
        province: "KHYBER PAKHTUNKHWA",
        districts: [
          { name: "Lakki Marwat", cases: 32 },
          { name: "Bannu", cases: 26 },
          { name: "North Waziristan", cases: 9 },
          { name: "Torghar", cases: 7 },
          { name: "Tank", cases: 6 },
          { name: "D.I. Khan", cases: 4 },
          { name: "Hangu", cases: 2 },
          { name: "Shangla", cases: 1 },
          { name: "Charsadda", cases: 1 },
          { name: "Bajour", cases: 1 },
          { name: "Khyber", cases: 1 },
          { name: "South Waziristan", cases: 1 },
          { name: "Swabi", cases: 1 },
          { name: "Mohmand", cases: 1 }
        ]
      },
      {
        province: "SINDH",
        districts: [
          { name: "Mirpur Khas", cases: 4 },
          { name: "Larkana", cases: 3 },
          { name: "Jamshoro", cases: 3 },
          { name: "Kambar", cases: 3 },
          { name: "Orangi Town", cases: 2 },
          { name: "Hyderabad", cases: 2 },
          { name: "Dadu", cases: 2 },
          { name: "Lyari Town", cases: 1 },
          { name: "Gulshan Iqbal", cases: 1 },
          { name: "Sujawal", cases: 1 },
          { name: "Jamshed Town", cases: 1 },
          { name: "Kamari Town", cases: 1 },
          { name: "Sh. Benazirabad", cases: 1 },
          { name: "Badin", cases: 1 },
          { name: "Sukkur", cases: 1 },
          { name: "Tando Allahyar", cases: 1 },
          { name: "Thatta", cases: 1 },
          { name: "Jacobabad", cases: 1 }
        ]
      },
      {
        province: "BALOCHISTAN",
        districts: [
          { name: "Killa Abdullah", cases: 5 },
          { name: "Jaffarabad", cases: 3 },
          { name: "Quetta", cases: 1 },
          { name: "Harnai", cases: 1 },
          { name: "Mastung", cases: 1 },
          { name: "Nasirabad", cases: 1 }
        ]
      },
      {
        province: "PUNJAB",
        districts: [
          { name: "Lahore", cases: 5 },
          { name: "D.G. Khan", cases: 4 },
          { name: "Jhelum", cases: 1 },
          { name: "Muzaffargarh", cases: 1 },
          { name: "Okara", cases: 1 }
        ]
      }
    ]
  }
]

// 2. cVDPV2 Polio Cases Dataset (2019 - 2021)
const cvdpv2Data: cVDPV2Row[] = [
  // Punjab
  { province: "PUNJAB", district: "Attock", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "PUNJAB", district: "D.G. Khan", cases2019: "-", cases2020: 1, cases2021: 1 },
  { province: "PUNJAB", district: "Faisalabad", cases2019: "-", cases2020: 6, cases2021: "-" },
  { province: "PUNJAB", district: "Gujranwala", cases2019: 1, cases2020: "-", cases2021: "-" },
  { province: "PUNJAB", district: "Jhang", cases2019: "-", cases2020: 8, cases2021: "-" },
  { province: "PUNJAB", district: "Mandi Bahauddin", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "PUNJAB", district: "Muzaffargarh", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "PUNJAB", district: "Okara", cases2019: "-", text: "", cases2020: 2, cases2021: "-" },
  { province: "PUNJAB", district: "Rawalpindi", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "PUNJAB", district: "Rahim Yar Khan", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "PUNJAB", district: "Sahiwal", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "PUNJAB", district: "Toba Tek Singh", cases2019: "-", cases2020: 2, cases2021: "-" },
  // Sindh
  { province: "SINDH", district: "Hyderabad", cases2019: "-", cases2020: 3, cases2021: "-" },
  { province: "SINDH", district: "Jacobabad", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "SINDH", district: "Kambar", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "SINDH", district: "Khairpur", cases2019: "-", cases2020: 2, cases2021: "-" },
  { province: "SINDH", district: "Karachi Baldia", cases2019: "-", cases2020: 9, cases2021: "-" },
  { province: "SINDH", district: "Karachi Bin Qasim", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "SINDH", district: "Karachi Gadap", cases2019: "-", cases2020: 11, cases2021: "-" },
  { province: "SINDH", district: "Karachi Gulshan-e-Iqbal", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "SINDH", district: "Karachi Malir", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "SINDH", district: "Karachi Liaquatabad (Nizami)", cases2019: "-", cases2020: 2, cases2021: "-" },
  { province: "SINDH", district: "Karachi Orangi", cases2019: "-", cases2020: 7, cases2021: "-" },
  { province: "SINDH", district: "Karachi Saddar", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "SINDH", district: "Karachi SITE", cases2019: "-", cases2020: 4, cases2021: "-" },
  { province: "SINDH", district: "Shikarpur", cases2019: "-", cases2020: 1, cases2021: 1 },
  { province: "SINDH", district: "Sukkur", cases2019: "-", cases2020: "-", cases2021: 1 },
  // Khyber Pakhtunkhwa
  { province: "KHYBER PAKHTUNKHWA", district: "Bajour", cases2019: 1, cases2020: 3, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Bannu", cases2019: "-", cases2020: 2, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Charsadda", cases2019: 1, cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Dir Lower", cases2019: "-", cases2020: 3, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Dir Upper", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "FR Bannu", cases2019: "-", cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Hangu", cases2019: "-", cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Khyber", cases2019: 3, cases2020: 15, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Kohistan Lower", cases2019: 2, cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Kohistan Upper", cases2019: 1, cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Lakki Marwat", cases2019: 1, cases2020: 5, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Mardan", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Mohmand", cases2019: 3, cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Nowshera", cases2019: "-", cases2020: 4, cases2021: 1 },
  { province: "KHYBER PAKHTUNKHWA", district: "Peshawar", cases2019: 1, cases2020: 6, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Tank", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Torghar", cases2019: 3, cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Waziristan North", cases2019: "-", cases2020: "-", cases2021: "-" },
  { province: "KHYBER PAKHTUNKHWA", district: "Waziristan South", cases2019: "-", cases2020: 1, cases2021: "-" },
  // Balochistan
  { province: "BALOCHISTAN", district: "Killa Saifullah", cases2019: "-", cases2020: "-", cases2021: 1 },
  { province: "BALOCHISTAN", district: "Pishin", cases2019: "-", cases2020: 2, cases2021: 1 },
  { province: "BALOCHISTAN", district: "Quetta", cases2019: "-", cases2020: 3, cases2021: "-" },
  { province: "BALOCHISTAN", district: "Awaran", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "BALOCHISTAN", district: "Chaghi", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "BALOCHISTAN", district: "Killa Abdullah", cases2019: "-", cases2020: 8, cases2021: 1 },
  { province: "BALOCHISTAN", district: "Lasbela", cases2019: "-", cases2020: 6, cases2021: "-" },
  { province: "BALOCHISTAN", district: "Mastung", cases2019: "-", cases2020: "-", cases2021: 1 },
  { province: "BALOCHISTAN", district: "Panjgur", cases2019: "-", cases2020: 1, cases2021: "-" },
  { province: "BALOCHISTAN", district: "Sherani", cases2019: "-", cases2020: 1, cases2021: "-" },
  // Gilgit Baltistan
  { province: "GILGIT BALTISTAN", district: "Diamer", cases2019: 4, cases2020: "-", cases2021: "-" },
  // ICT
  { province: "ISLAMABAD (ICT)", district: "Islamabad", cases2019: 1, cases2020: "-", cases2021: "-" }
]

export default function Page() {
  const [activeTab, setActiveTab] = useState<"wpv1" | "cvdpv2">("wpv1")
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter WPV1 by year
  const activeYearData = wpv1Data.find((d) => d.year === selectedYear)

  // Filter WPV1 data by search query
  const filteredWpv1Provinces = activeYearData
    ? activeYearData.provinces
        .map((prov) => {
          const matchedDistricts = prov.districts.filter((dist) =>
            dist.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          return {
            ...prov,
            districts: matchedDistricts
          }
        })
        .filter((prov) => prov.districts.length > 0)
    : []

  // Filter cVDPV2 data by search query
  const filteredCvdpv2 = cvdpv2Data.filter(
    (row) =>
      row.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.province.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Compute stats for 2026/2025/2024 at a glance
  const latest2026 = wpv1Data.find((d) => d.year === 2026)?.totalCases || 0
  const latest2025 = wpv1Data.find((d) => d.year === 2025)?.totalCases || 0
  const latest2024 = wpv1Data.find((d) => d.year === 2024)?.totalCases || 0

  return (
    <>
      <title>Polio Cases in Pakistan 2026 - District Wise</title>
      <meta name="description" content="Get the latest data on current polio cases in Pakistan (2025-2026). View total WPV and cVDPV2 polio cases in Pakistan broken down district-wise across Balochistan, Sindh, KP, and Punjab." />
      <link rel="canonical" href="https://www.endpolio.com.pk/polioin-pakistan/district-wise-polio-cases" />
      <meta name="robots" content="index, follow" />

      <div className="bg-[#f9fafb] min-h-screen text-slate-800 font-sans pb-16">
        {/* 1. Header & SEO Section */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="max-w-4xl">
              <nav className="flex space-x-2 text-sm text-gray-500 mb-4 items-center">
                <Link href="/" className="hover:text-primary transition">Home</Link>
                <span>/</span>
                <Link href="/polioin-pakistan" className="hover:text-primary transition">Polio in Pakistan</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">District-Wise Cases</span>
              </nav>
              
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight">
                District-Wise Polio Cases in Pakistan
              </h1>
              
              <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
                An authoritative, detailed archive of wild poliovirus type 1 (<strong>WPV1</strong>) 
                and circulating vaccine-derived poliovirus type 2 (<strong>cVDPV2</strong>) cases across 
                the districts of Pakistan. Tracking these cases helps direct door-to-door vaccination campaigns 
                and surveillance networks to target high-risk areas.
              </p>
            </div>

            {/* Key Indicators at a glance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">2026 WPV Cases</span>
                  <h4 className="text-2xl font-bold text-gray-950 mt-1">{latest2026} {latest2026 === 1 ? 'Case' : 'Cases'}</h4>
                  <p className="text-xs text-gray-500 mt-1">Current polio cases in Pakistan</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">2025 WPV Cases</span>
                  <h4 className="text-2xl font-bold text-gray-950 mt-1">{latest2025} Cases</h4>
                  <p className="text-xs text-gray-500 mt-1">Total polio cases in Pakistan 2025</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">2024 WPV Cases</span>
                  <h4 className="text-2xl font-bold text-gray-950 mt-1">{latest2024} Cases</h4>
                  <p className="text-xs text-gray-500 mt-1">Polio cases in Pakistan 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Content Dashboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Interactive Tables (65%) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Control Panel: Switch case types & search */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-100">
                  <div className="flex space-x-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200 max-w-max">
                    <button
                      onClick={() => {
                        setActiveTab("wpv1")
                        setSearchQuery("")
                      }}
                      className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                        activeTab === "wpv1"
                          ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      WPV1 Wild Polio
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("cvdpv2")
                        setSearchQuery("")
                      }}
                      className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                        activeTab === "cvdpv2"
                          ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      cVDPV2 Cases
                    </button>
                  </div>

                  {/* Real-time search bar */}
                  <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search district or province..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                </div>

                {/* Year pills for WPV1 */}
                {activeTab === "wpv1" && (
                  <div className="mt-5">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                      Select Reporting Year
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {wpv1Data.map((d) => (
                        <button
                          key={d.year}
                          onClick={() => {
                            setSelectedYear(d.year)
                            setSearchQuery("")
                          }}
                          className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition ${
                            selectedYear === d.year
                              ? "bg-gray-900 border-gray-900 text-white"
                              : "bg-white hover:bg-gray-50 border-gray-200 text-gray-600"
                          }`}
                        >
                          {d.year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* WPV1 Data Panel */}
              {activeTab === "wpv1" && activeYearData && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        WPV Polio Cases {selectedYear} Across Districts in Pakistan
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Confirmed WPV cases breakdown by province and district
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                        {activeYearData.totalCases} {activeYearData.totalCases === 1 ? 'Case' : 'Cases'}
                      </span>
                      <div className="text-xs text-gray-400 mt-1 font-medium">
                        {activeYearData.totalDistricts} {activeYearData.totalDistricts === 1 ? 'District' : 'Districts'} affected
                      </div>
                    </div>
                  </div>

                  {filteredWpv1Provinces.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No districts matched your search criteria.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                          <tr>
                            <th className="px-6 py-4">Province</th>
                            <th className="px-6 py-4">District Name</th>
                            <th className="px-6 py-4 text-right">Confirmed Cases</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {filteredWpv1Provinces.map((prov) =>
                            prov.districts.map((dist, idx) => (
                              <tr key={`${prov.province}-${dist.name}`} className="hover:bg-gray-50/70 transition">
                                <td className="px-6 py-3.5 font-medium text-gray-500 text-xs tracking-wider">
                                  {idx === 0 ? prov.province : ""}
                                </td>
                                <td className="px-6 py-3.5 font-medium text-gray-900">
                                  {dist.name}
                                </td>
                                <td className="px-6 py-3.5 text-right font-semibold text-gray-900">
                                  <span className={`inline-block px-2.5 py-0.5 rounded text-xs ${
                                    dist.cases >= 10 
                                      ? "bg-red-100 text-red-800" 
                                      : dist.cases >= 3 
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-700"
                                  }`}>
                                    {dist.cases}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                          {/* Summary Footer */}
                          {searchQuery === "" && (
                            <tr className="bg-gray-50/50 font-bold border-t-2 border-gray-200">
                              <td className="px-6 py-4 text-gray-900 text-xs uppercase tracking-wider" colSpan={2}>
                                {selectedYear} Total Cases
                              </td>
                              <td className="px-6 py-4 text-right text-gray-950 text-base">
                                {activeYearData.totalCases}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* cVDPV2 Data Panel */}
              {activeTab === "cvdpv2" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        cVDPV2 Polio Cases Across Districts in Pakistan
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Circulating vaccine-derived poliovirus type 2 cases historical tracker (2019-2021)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        cVDPV2 Total
                      </span>
                    </div>
                  </div>

                  {filteredCvdpv2.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No districts matched your search criteria.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                          <tr>
                            <th className="px-6 py-4">Province</th>
                            <th className="px-6 py-4">District Name</th>
                            <th className="px-6 py-4 text-center">Cases 2019</th>
                            <th className="px-6 py-4 text-center">Cases 2020</th>
                            <th className="px-6 py-4 text-center">Cases 2021</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {filteredCvdpv2.map((row, idx) => (
                            <tr key={`${row.province}-${row.district}-${idx}`} className="hover:bg-gray-50/70 transition">
                              <td className="px-6 py-3.5 font-medium text-gray-500 text-xs tracking-wider">
                                {row.province}
                              </td>
                              <td className="px-6 py-3.5 font-medium text-gray-900">
                                {row.district}
                              </td>
                              <td className="px-6 py-3.5 text-center font-medium text-gray-600">
                                {row.cases2019}
                              </td>
                              <td className="px-6 py-3.5 text-center font-medium text-gray-600">
                                {row.cases2020}
                              </td>
                              <td className="px-6 py-3.5 text-center font-medium text-gray-600">
                                {row.cases2021}
                              </td>
                            </tr>
                          ))}
                          {/* Summary Footer */}
                          {searchQuery === "" && (
                            <tr className="bg-gray-50/50 font-bold border-t-2 border-gray-200">
                              <td className="px-6 py-4 text-gray-900 text-xs uppercase tracking-wider" colSpan={2}>
                                TOTAL CASES
                              </td>
                              <td className="px-6 py-4 text-center text-gray-900">
                                22
                              </td>
                              <td className="px-6 py-4 text-center text-gray-900">
                                135
                              </td>
                              <td className="px-6 py-4 text-center text-gray-900">
                                8
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Rich Informational Content / FAQ / Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  About Polio Eradication Campaigns in Pakistan
                </h2>
                
                <div className="prose prose-sm text-gray-600 max-w-none space-y-4 leading-relaxed">
                  <p>
                    To eliminate the threat of wild poliovirus transmission, the Pakistan Polio Eradication 
                    Programme coordinates targeted door-to-door vaccination campaigns. These campaigns 
                    focus on high-risk areas identified through systematic environment testing and district case 
                    counts.
                  </p>
                  <p>
                    <strong>Why District-Wise Data Matters:</strong> Broad provincial data can mask specific hot zones. 
                    By publishing exact <em>district wise polio cases in pakistan</em>, medical field teams, local governments, 
                    and WHO partners can allocate specific vaccine supplies, mobilize local resources, and deploy communication 
                    networks to address vaccine hesitancy.
                  </p>
                  <p>
                    <strong>Current Status in 2026:</strong> So far in 2026, surveillance reports have confirmed 3 WPV1 cases in Sujawal, Bannu, and North Waziristan. Continuous vigilance and regular booster doses remain crucial to protect children from paralysis.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">What is WPV1?</h4>
                    <p className="text-xs text-gray-500 leading-normal">
                      Wild Poliovirus Type 1 is the primary strain active in the remaining reservoirs of Pakistan and Afghanistan.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">What is cVDPV2?</h4>
                    <p className="text-xs text-gray-500 leading-normal">
                      Circulating Vaccine-Derived Poliovirus Type 2 occurs in settings with low overall immunization rates, emphasizing the need for comprehensive coverage.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Image and Actions Sidebar (35%) */}
            <div className="space-y-6">
              
              {/* Image widget */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-4.5 w-4.5 text-primary" />
                    Provincial Overview Map
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Visual representation of cases by province</p>
                </div>
                <div className="p-5">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-100 group">
                    <img
                      src="https://cdn.endpolio.com.pk/uploads/2026/06/poliocase-in-provinces1-WFp8nhrL.webp"
                      alt="Polio cases in Provinces"
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed text-center">
                    Overview of poliovirus distribution in Pakistan. Click below to view the detailed provincial statistics.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/polioin-pakistan/polio-cases-in-provinces"
                      className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition group"
                    >
                      View Provincial Details
                      <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Helpline Sidebar Widget */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  <h4 className="font-bold text-gray-950 text-sm">Report a Case / Query</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If you detect symptoms of sudden flaccid paralysis in any child under 15 years, or have queries about local vaccination campaigns, contact the Sehat Tahaffuz Helpline immediately.
                </p>
                <div className="pt-2">
                  <a
                    href="tel:1166"
                    className="block text-center py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 transition bg-white"
                  >
                    Call Helpline: 1166
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}
