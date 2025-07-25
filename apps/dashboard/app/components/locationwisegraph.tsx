"use client";

import React, { useEffect, useState } from "react"
import LiveDataGraph from "../components/livedatagraph";
import PresentAbsent from "../components/presentabsent";
import LiveDataGraphLocationWise from "../components/LiveDataGraphlocationwise";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent } from "@repo/ui/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import LiveDataGraphLocationSelection from "./LiveDataGraphlocationselection";
import PresentAbsentLocationSelection from "./PresentAbsentlocationselection";


export default function LocationWiseGraph() {
    const [value, setValue] = useState("")
    const [selectedName, setSelectedName] = useState("");
    const [selectedNamediv, setSelectedNamediv] = useState("");
    const [selectedNamedept, setSelectedNamedept] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const names = ["sub1", "sub2", "sub3", "sub4", "sub5"];
    const namesdiv = ["div1", "div2", "div3", "div4", "div5"];
    const namesdept = ["dept1", "dept2", "dept3", "dept4", "dept5"];

    const [formData, setFormData] = useState({
        category: "",
        name: "",
        email: "",
        location: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLbkw4Q0ZfZUJHSHR2cW1NaG92cFpCWkpLMlBRdlFWOGtSMWRrRU0yNU1nIn0.eyJleHAiOjE3NDk1NjcyMjUsImlhdCI6MTc0OTUzMTIyNSwianRpIjoib25ydHJvOjk3YmU2ZDg0LTdkYjMtNGM3Yy1hZmM0LTcxMjcyZDQ4OWYxNiIsImlzcyI6Imh0dHA6Ly8xMjIuMTY2LjI0NS45Nzo4MDgwL3JlYWxtcy9pbm9wcyIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiI2MjkyNDkzZi05ZjU0LTQxOGMtYWJhNi1hMmQzMjk0ODE2OTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzcHJpbmctYmFja2VuZCIsInNpZCI6ImNlYTU4MTE4LTNmNWMtNDMyYS04YTFkLWY2Y2I0MWZhMmE3YiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbm9wcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJjcmVhdGUtY2xpZW50Il19LCJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsImRlbGV0ZS1hY2NvdW50IiwibWFuYWdlLWNvbnNlbnQiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJQcmFqd2FsIE4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0dXNlciIsImdpdmVuX25hbWUiOiJQcmFqd2FsIiwiZmFtaWx5X25hbWUiOiJOIiwiZW1haWwiOiJwcmFqd2FsQGlub3BzLnRlY2gifQ.ZcGf_GuhYf48eR6qTNHoTD585fq610jN4d8jbYb-5xvn0LrQrhZfFkLav4pNjWVgCeWEaw0cXkije214ib7bOyOSxI273osv3Vz2I_407U0yXFMtqRKStgykF3j0gpEuO1b9iM4Pi2wt_nhErusdWEVw3zW7taG1X3_MPiimZVM14aBDCn_UAT5NgwtxLKXHJJZzv6o4XUY3LoT3uBHxDoPoToWot1W1vShP7CYj7X8YsxTtmNLm5jGYMOHv8ymtGKU99c2XSsyYAOJFry0__ul4EuM8IoaOtXrtzVM9ZoStXOpNGu5TFkcPhiHKNr2DS_LapBt60VyWRB2fnh-mng";

    useEffect(() => {
        // Define the GraphQL query
        const query = `
      query GetOrganizationsById {
        getOrganizationsById(id: "6839a36e20fbaf23ae2c410c", collection: "organization") {
          location {
            locationName
          }
        }
      }
    `;

        // Send the request using fetch
        fetch('http://192.168.88.100:8000/graphql', { // Replace '/graphql' with your GraphQL API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            body: JSON.stringify({ query })
        })
            .then(res => res.json())
            .then(data => {
                // Extract the location names from the data
                if (data?.data?.getOrganizationsById?.location) {
                    const locationNames = data.data.getOrganizationsById.location.map((loc: { locationName: string }) => loc.locationName);
                    setLocations(locationNames);
                }
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <main className="flex flex-1 flex-col gap-2 p-0 md:gap-4 md:p-4">

                <Select onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location, index) => (
                            <SelectItem key={index} value={location}>{location}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>


                {selectedLocation && (
                    <>

                        <PresentAbsentLocationSelection name={selectedLocation} />
                        <LiveDataGraphLocationSelection name={selectedLocation} />

                        <div className="flex flex-col items-center">
                            <Carousel className="w-full max-w-xs content-start">
                                <CarouselContent className="-ml-1">
                                    {/* <div className="flex flex-wrap gap-4"> */}
                                    {names.map((name, index) => (
                                        // {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <button
                                                    onClick={() => setSelectedName(name)}
                                                    className="w-full text-left rounded-xl shadow hover:shadow-lg transition"
                                                >
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <span className="text-2xl font-semibold">{name}</span>
                                                        </CardContent>
                                                    </Card>
                                                </button>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    {/* </div> */}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            {selectedName && (
                                <div className="mt-6 w-full max-w-2xl">
                                    <LiveDataGraphLocationWise name={selectedName} />
                                </div>
                            )}
                        </div>
                    </>
                )}

                {selectedName && (
                    <div className="flex flex-col items-center">
                        <Carousel className="w-full max-w-xs content-start">
                            <CarouselContent className="-ml-1">
                                {/* <div className="flex flex-wrap gap-4"> */}
                                {namesdiv.map((name, index) => (
                                    // {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <button
                                                onClick={() => setSelectedNamediv(name)}
                                                className="w-full text-left rounded-xl shadow hover:shadow-lg transition"
                                            >
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-2xl font-semibold">{name}</span>
                                                    </CardContent>
                                                </Card>
                                            </button>
                                        </div>
                                    </CarouselItem>
                                ))}
                                {/* </div> */}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        {selectedNamediv && (
                            <div className="mt-6 w-full max-w-2xl">
                                <LiveDataGraphLocationWise name={selectedNamediv} />
                            </div>
                        )}
                    </div>
                )}

                {selectedNamediv && (
                    <div className="flex flex-col items-center">
                        <Carousel className="w-full max-w-xs content-start">
                            <CarouselContent className="-ml-1">
                                {/* <div className="flex flex-wrap gap-4"> */}
                                {namesdept.map((name, index) => (
                                    // {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <button
                                                onClick={() => setSelectedNamedept(name)}
                                                className="w-full text-left rounded-xl shadow hover:shadow-lg transition"
                                            >
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-2xl font-semibold">{name}</span>
                                                    </CardContent>
                                                </Card>
                                            </button>
                                        </div>
                                    </CarouselItem>
                                ))}
                                {/* </div> */}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        {selectedNamedept && (
                            <div className="mt-6 w-full max-w-2xl">
                                <LiveDataGraphLocationWise name={selectedNamedept} />
                            </div>
                        )}
                    </div>
                )}

            </main>
        </div>
    )


}

