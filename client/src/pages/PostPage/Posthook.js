import React from "react";
import Postfrom from "../components/Postform";
import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

const AddInput = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "routes",
    });

    return (
        <ul>
            <Postfrom />
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

const Input = () => {
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
                            min-height: 35px;
                            width: 26vw;
                            min-width: 180px;
                            font-size: 1.4rem;
                            font-weight: 600;
                        `}
                        onChange={field.onChange}
                        // onKeyUp={enterkey}
                        value={field.value}
                    ></input>
                );
            }}
        />
    );
};

const Post = () => {
    const methods = useForm({ defaultValues });
    const { control, handleSubmit, watch } = methods;

    const submit = (data) => {
        console.log(data);
    };

    console.log(watch("routes"));
    return (
        <FormProvider {...methods}>
            <form>
                {/* <Input /> */}
                {/* <Postfrom /> */}
                <AddInput />
                <button type="button" onClick={() => handleSubmit(submit, console.log)()}>
                    asd
                </button>
            </form>
        </FormProvider>
    );
};

export default Post;
