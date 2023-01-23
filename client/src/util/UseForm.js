import React, { useState } from "react";
import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import Button from "../components/Button";
import PostformItems from "../components/Post_components/PostformItems";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GrAddCircle } from "react-icons/gr";

// route= {
//     name: string;
//     address: string;
//     price:number;
//     transportation: string;
//     content:string;
//     images: File[]
//     }
//     type = {
//     name:string;
//     category: string;
//     date: Date;
//     totalPrice: number;
//     tags: string[]
//     routes:route[]
//     }

const defaultValues = {
    title: "",
    body: "",
    themeType: "",
    date: new Date(),
    routeName: "",
    routes: [
        {
            price: Number(),
            vehicle: "",
            place: "",
            body: "",
            x: "",
            y: "",
        },
    ],
};

export const AddInput = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "routes",
    });

    return (
        <ul>
            {fields.map((item, index) => (
                <li key={item.id}>
                    <Controller
                        render={({ field }) => <input {...field} />}
                        name={`routes.${index}.name`}
                        control={control}
                    />
                    <button type="button" onClick={() => append(index)}>
                        add
                    </button>
                    <button type="button" onClick={() => remove(index)}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export const Input = (props) => {
    const { control, watch, register } = useFormContext();
    // console.log("watch", watch("place"));
    return (
        <Controller
            control={control}
            name={`${props.name}`}
            render={({ field }) => {
                // console.log(`field`, field);
                return (
                    <input
                        css={css`
                            width: ${props.width || null};
                            min-height: 35px;
                            min-width: 180px;
                            padding: 10px;
                            font-size: 1.1rem;
                            border: ${PALETTE.border};
                            border-radius: ${PALETTE.border_radius};
                            &:focus {
                                border: 2px solid ${PALETTE.default_hover};
                            }
                            ::placeholder {
                                font-size: 0.9rem;
                            }
                        `}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder={props.placeholder}
                        {...register(`${props.name}`)}
                    ></input>
                );
            }}
        />
    );
};

export const Post = (props) => {
    const methods = useForm({ defaultValues });
    const { control, handleSubmit, watch } = methods;
    const submit = (data) => {
        console.log(data);
    };

    console.log(watch(`routes`, "routes"));

    return (
        <FormProvider {...methods}>
            <form onChange={handleSubmit}>
                <Input placeholder={props.placeholder} width={props.width} />
            </form>
        </FormProvider>
    );
};

export const AddRoute = (props) => {
    const methods = useForm({ defaultValues });
    const [data, setData] = useState("");
    const { control, handleSubmit, watch } = methods;
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "routes",
    });

    const submit = (data) => {
        // setData(JSON.stringify(data));
        console.log(data);
    };

    const handleDrag = ({ source, destination }) => {
        if (destination) {
            move(source.index, destination.index);
        }
    };

    console.log(watch(`routes`, "routes"));
    console.log(watch(`defaultValues`, "defaultValues"));
    return (
        <FormProvider {...methods}>
            <form onChange={handleSubmit(submit)}>
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="test-items">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {fields.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={`test[${index}]`}
                                            draggableId={`item-${index}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <li
                                                    key={item.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    css={css`
                                                        margin: 20px 0;
                                                    `}
                                                >
                                                    <Controller
                                                        render={({ field }) => (
                                                            <PostformItems
                                                                {...field}
                                                                onClick={[
                                                                    () => append(index),
                                                                    () => remove(index),
                                                                ]}
                                                            />
                                                        )}
                                                        name={`routes.${index}.name`}
                                                        control={control}
                                                    />
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </form>
        </FormProvider>
    );
};
