import React, { useCallback, useState } from "react";
import { Button, Grid, Icon, Radio, Search } from "semantic-ui-react";

const cats = ["Danielle", "Daisy", "Atlas"];

const search = async (searchTerm: string) => {
    await new Promise(res => setTimeout(res, 500));
    return cats.filter(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())).map(cat => ({ title: cat }));
};

export const Cats = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ title: string; description?: string }[]>([]);
    const [value, setValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const handleSearchChange = useCallback(async (e, data) => {
        console.log("handleSearchChange", { e, data });
        setValue(data.value);
        setLoading(true);
        setResults(await search(data.value));
        setLoading(false);
    }, []);
    const selectCat = useCallback((e, data) => {
        setValue(data.result.title);
    }, []);
    return (
        <Grid>
            <Grid.Column width={16}>
                <h3>Select a Cat</h3>
                <Search
                    fluid
                    loading={loading}
                    onResultSelect={selectCat}
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
            </Grid.Column>
            <Grid.Column textAlign="right">
                <Button icon="filter" color="teal" onClick={() => setShowFilters(!showFilters)} />
                {showFilters ? (
                    <>
                        <Radio toggle label="Show Adopted Cats" />
                    </>
                ) : null}
            </Grid.Column>
        </Grid>
    );
};
