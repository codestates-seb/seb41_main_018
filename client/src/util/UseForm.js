import React, { useState } from "react";
import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import Button from "../components/Button";
import PostformItems from "../components/Post_components/PostformItems";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GrAddCircle } from "react-icons/gr";
import { FiPlus } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
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
    name: "",
    category: "",
    date: new Date(),
    totalPrice: 0,
    tags: [],
    routes: [{ name: "" }],
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
    const { control, watch } = useFormContext();
    console.log("watch", watch("name"));
    return (
        <Controller
            control={control}
            name="name"
            render={({ field }) => {
                console.log(field);
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

    console.log(watch("routes"));
    return (
        <FormProvider {...methods}>
            <form>
                <Input placeholder={props.placeholder} width={props.width} />
            </form>
        </FormProvider>
    );
};

export const AddRoute = () => {
    const { control } = useFormContext();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "routes",
    });

    return (
        <ul>
            {fields.map((item, index) => (
                <li
                    key={item.id}
                    css={css`
                        display: flex;
                    `}
                >
                    <Controller
                        render={({ field }) => <PostformItems {...field} />}
                        name={`routes.${index}.name`}
                        control={control}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        delete
                    </button>
                </li>
            ))}
            <button type="button" onClick={() => append()}>
                add
            </button>
        </ul>
    );
};

export const Route = (props) => {
    const [ishover, setHover] = useState(false);
    const methods = useForm({ defaultValues });
    const { control, handleSubmit, watch } = methods;
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "routes",
    });

    const submit = (data) => {
        console.log(data);
    };

    const handleDrag = ({ source, destination }) => {
        if (destination) {
            move(source.index, destination.index);
        }
    };

    console.log(watch("routes"));
    return (
        <FormProvider {...methods}>
            <form>
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
                                                        display: flex;
                                                        margin: 10px 0;
                                                    `}
                                                    onMouseEnter={() => {
                                                        setHover(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setHover(false);
                                                    }}
                                                >
                                                    <Controller
                                                        render={({ field }) => (
                                                            <PostformItems {...field} />
                                                        )}
                                                        name={`routes.${index}.name`}
                                                        control={control}
                                                    />
                                                    <AiFillDelete
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        css={
                                                            ishover
                                                                ? css`
                                                                      font-size: 1.2rem;
                                                                      margin: auto 10px;
                                                                  `
                                                                : css`
                                                                      display: none;
                                                                  `
                                                        }
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
                <button
                    type="button"
                    css={css`
                        display: flex;
                        align-self: center;
                        padding: 10px;
                        border: 1px solid ${PALETTE.default_active};
                        background-color: ${PALETTE.default_active};
                        box-shadow: ${PALETTE.box_shadow};
                        color: white;
                        border-radius: 100px;
                        width: fit-content;
                        font-size: 0.8rem;
                        &:hover {
                            cursor: pointer;
                        }
                    `}
                    onClick={() => append()}
                >
                    <FiPlus />
                    Add to Route
                </button>
            </form>
        </FormProvider>
    );
};
