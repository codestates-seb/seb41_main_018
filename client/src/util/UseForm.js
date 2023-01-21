import React from "react";
import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
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
