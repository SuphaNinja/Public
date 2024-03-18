import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "../lib/queries/GetUsers";
import { useParams } from "react-router";


export default function Home() {

    return (
        <div className="bg-gray-500 p-60">
            <h1>home</h1>
            <button className="text-white text-2xl" >TEST</button>
        </div>
    )
}