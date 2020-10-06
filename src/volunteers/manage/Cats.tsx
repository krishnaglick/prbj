import React, { useCallback, useState } from "react";
import { Button, Grid, Radio, Search, Segment } from "semantic-ui-react";
import moment from "moment";
import { Cat } from "./Cat";

const MedicalProcedureTypes = [
    "FVRCP 1",
    "FVRCP 2",
    "FVRCP 3",
    "FVRCP Adult",
    "FIV/LEUK Test",
    "FECAL",
    "Rabies",
    "De-Wormer - Strongid",
    "De-Wormer - Panacur",
    "Capstar",
    "Flea",
    "Other",
] as const;

type Intake = {
    date: number;
    weight: string;
    age: number;
    breed: string;
    color: string;
    from: string;
};

type MedicalProcedure = {
    date: number;
    type: typeof MedicalProcedureTypes[number];
    additionalDetails?: string;
};

type Medicine = {
    name: string;
    date: number;
    by: string;
};

export type Cat = {
    id: number;
    name: string;
    gender: string;
    altered: boolean;
    adopted: boolean;
    intake: Intake;
    microchipNumber: number;
    medicalProcedures: MedicalProcedure[];
    medicines: Medicine[];
};

const cats: Cat[] = [
    {
        id: 0,
        name: "Atlas",
        gender: "Male",
        altered: true,
        adopted: false,
        intake: {
            date: Date.now(),
            weight: "10lbs",
            age: 2,
            breed: "Domestic Short Hair",
            color: "Cheetah Grey",
            from: "Relinquished by Owner",
        },
        microchipNumber: 1,
        medicalProcedures: [
            {
                date: Date.now(),
                type: "Capstar",
            },
        ],
        medicines: [
            {
                name: "Insulin",
                date: Date.now(),
                by: "Serena",
            },
        ],
    },
    {
        id: 1,
        name: "Danielle",
        gender: "Female",
        altered: true,
        adopted: true,
        intake: {
            date: moment().subtract(2, "years").unix(),
            weight: "15lbs",
            age: 4,
            breed: "Domestic Short Hair",
            color: "Tortise-Shell Calico",
            from: "Taken from Kill Shelter",
        },
        microchipNumber: 2,
        medicalProcedures: [
            {
                date: Date.now(),
                type: "De-Wormer - Panacur",
            },
            {
                date: moment().subtract(2, "months").unix(),
                type: "Rabies",
            },
            {
                date: moment().subtract(4, "months").unix(),
                type: "Other",
                additionalDetails: "Something additional was done",
            },
        ],
        medicines: [],
    },
    {
        id: 2,
        name: "Daisy",
        gender: "Female",
        altered: true,
        adopted: false,
        intake: {
            date: moment().subtract(1, "years").unix(),
            weight: "6lbs",
            age: 2,
            breed: "Domestic Short Hair",
            color: "Calico",
            from: "Surrender from Owner",
        },
        microchipNumber: 3,
        medicalProcedures: [
            {
                date: Date.now(),
                type: "FECAL",
            },
            {
                date: moment().subtract(5, "months").unix(),
                type: "Flea",
            },
            {
                date: moment().subtract(7, "months").unix(),
                type: "Other",
                additionalDetails: "Something additional was done",
            },
        ],
        medicines: [],
    },
];

const search = async (searchTerm: string, filters: typeof defaultFilters) => {
    await new Promise(res => setTimeout(res, 500));
    return cats
        .filter(cat => {
            if (cat.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                if (!filters.showAdopted && cat.adopted) {
                    return false;
                }

                return true;
            }
            return false;
        })
        .map(cat => ({ title: cat.name }));
};

const defaultFilters = {
    showAdopted: false,
};

export const Cats = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ title: string; description?: string }[]>([]);
    const [value, setValue] = useState<string | undefined>();
    const [selectedCat, setSelectedCat] = useState<Cat | undefined>();
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState(defaultFilters);

    const handleSearchChange = useCallback(
        async (_, data) => {
            setValue(data.value);
            setLoading(true);
            setResults(await search(data.value, filters));
            setLoading(false);
        },
        [filters],
    );
    const selectCat = useCallback((_, data) => {
        setValue(data.result.title);
        setSelectedCat(cats.find(cat => cat.name === data.result.title));
    }, []);
    const clearCat = useCallback(() => {
        setValue(undefined);
        setSelectedCat(undefined);
    }, []);

    return (
        <>
            <Grid.Column width={8}>
                <div>
                    <h3>Search for a Cat</h3>
                    <div className="search">
                        <Search
                            fluid
                            loading={loading}
                            onResultSelect={selectCat}
                            onSearchChange={handleSearchChange}
                            results={results}
                            value={value}
                        />
                        {selectedCat ? (
                            <Button className="clear-search" color="teal" circular onClick={clearCat} icon="x" />
                        ) : null}
                    </div>
                </div>
                {selectedCat ? <Cat cat={selectedCat} updateCat={() => null} /> : null}
            </Grid.Column>
            <Grid.Column width={4} className="filters">
                <Button icon="filter" color="teal" onClick={() => setShowFilters(!showFilters)} />
                <div className="filter-item">
                    {showFilters ? (
                        <Radio
                            toggle
                            label="Show Adopted Cats"
                            checked={filters.showAdopted}
                            onChange={(_, { checked }) => setFilters({ ...filters, showAdopted: !!checked })}
                        />
                    ) : null}
                </div>
            </Grid.Column>
        </>
    );
};
