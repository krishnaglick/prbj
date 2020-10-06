import React from "react";
import moment from "moment";
import { Card, Segment } from "semantic-ui-react";
import type { Cat as CatType } from "./Cats";

export const Cat = ({ cat, updateCat }: { cat: CatType; updateCat: (cat: CatType) => void }) => (
    <div>
        <Segment vertical>Name: {cat.name}</Segment>
        <Segment vertical>Gender: {cat.gender}</Segment>
        <Segment vertical>Altered?: {cat.altered ? "Yes" : "No"}</Segment>
        <Segment vertical>Microchip Number: {cat.microchipNumber}</Segment>
        {cat.adopted ? <Segment vertical>This cat has been adopted</Segment> : null}
        <Segment.Group>
            <Segment attached="top">Intake</Segment>
            <Segment>From: {cat.intake.from}</Segment>
            <Segment>Intake Date: {moment(cat.intake.date).format("MM-DD-YYYY")}</Segment>
            <Segment>Intake Weight: {cat.intake.weight}</Segment>
            <Segment>Intake Age: {cat.intake.age}</Segment>
            <Segment>Cat Color: {cat.intake.color}</Segment>
            <Segment>Cat Breed: {cat.intake.breed}</Segment>
        </Segment.Group>
        {cat.medicalProcedures.length ? (
            <Segment.Group piled>
                <Segment attached="top">Medical Procedures</Segment>
                {cat.medicalProcedures.map((medicalProcedure, i) => (
                    <Segment key={i}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{medicalProcedure.type}</Card.Header>
                                <Card.Meta>{moment(medicalProcedure.date).format("MM-DD-YYYY")}</Card.Meta>
                                {medicalProcedure.additionalDetails ? (
                                    <Card.Description>{medicalProcedure.additionalDetails}</Card.Description>
                                ) : null}
                            </Card.Content>
                        </Card>
                    </Segment>
                ))}
            </Segment.Group>
        ) : null}
        {cat.medicines.length ? (
            <Segment.Group piled>
                <Segment attached="top">Medicines Administered</Segment>
                {cat.medicines.map((medicine, i) => (
                    <Segment key={i}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{medicine.name}</Card.Header>
                                <Card.Meta>{moment(medicine.date).format("MM-DD-YYYY")}</Card.Meta>
                                <Card.Content>Administered by {medicine.by}</Card.Content>
                            </Card.Content>
                        </Card>
                    </Segment>
                ))}
            </Segment.Group>
        ) : null}
    </div>
);
