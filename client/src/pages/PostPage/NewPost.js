import React, { useRef } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { CgPacman } from "react-icons/cg";

import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from "react-hook-form";

import PostMap from "./PostMap/PostMap";
import PostMapTwo from "./PostMap/PostMapTwo";
import PostMapThree from "./PostMap/PostMapThree";
import PostMapFour from "./PostMap/PostMapFour";
import PostMapFive from "./PostMap/PostMapFive";

import Button from "../../components/Button";

import { useRecoilState } from "recoil";
import { xPosition, xPositionTwo, xpositionThree, xpositionFour, xpositionFive,
        yPosition, yPositionTwo, yPositionThree, yPositionFour, yPositionFive,
        detailPosition, detailPositionTwo, detailPositionThree, detailPositionFour, detailPositionFive} from "../../state/atom";

const defaultValues = {
    name: "",
    category: "",
    date: new Date(),
    totalPrice: 0,
    tags: [],
    routes: [{ name: "" }],
};

const AddInput = () => {
    const { control, register, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "routes",
    });
    
    const [xpo, setXpo] = useRecoilState(xPosition);
    const [xpo2, setXpo2 ] = useRecoilState(xPositionTwo);
    const [ypo, setYpo ] = useRecoilState(yPosition);
    const [dpo, setDpo] = useRecoilState(detailPosition);

    const MapList = (index) => {
        if(index === 0) {
            console.log(place1.current)
            return <PostMap placeword = {place1.current}/>;
        } else if (index === 1) {
            return <PostMapTwo placeword = {place2.current}/>;
        } else if (index === 2) {
            return <PostMapThree placeword = {place3.current}/>;
        } else if (index === 3) {
            return <PostMapFour placeword = {place4.current}/>;
        } else if (index === 4) {
            return <PostMapFive placeword = {place5.current}/>;
        }
    }
    
        const place1 = useRef();
        place1.current = watch(`routes.${0}.name`);

        const place2 = useRef();
        place2.current = watch(`routes.${1}.name`);

        const place3 = useRef();
        place3.current = watch(`routes.${2}.name`);

        const place4 = useRef();
        place4.current = watch(`routes.${3}.name`);

        const place5 = useRef();
        place5.current = watch(`routes.${4}.name`);

    return (
        <ul>
            {fields.map((item, index) => (
                <li key={item.id}>
                    <Controller
                        render={({ field }) => <input {...field} />}
                        name={`routes.${index}.name`}
                        control={control}
                    />
                    <div css={RowForm}>
                        <div css={RouteForm}>
                            <input
                                {...register(`routes.${index}.place`)}/>
                            <input
                                {...register(`routes.${index}.money`)}/>
                            <input
                                {...register(`routes.${index}.vehicle`)}/>
                        </div>
                        {MapList(index, watch(`routes.${index}.name`))}


                        //////
                        <div>{xpo}</div>
                        <div>{xpo2}</div>
                        <div>{dpo}</div>
                        //////

                    </div>
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
                    <div css={RouteForm}>
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
                    </div>
                );
            }}
        />
    );
};

const NewPost = () => {
    const methods = useForm({ defaultValues });
    const { control, handleSubmit, watch } = methods;

    const submit = (data) => {
        console.log(data);
    };

    console.log(watch("routes"));
    return (
        <FormProvider {...methods}>
            <form>
                {/* <Postfrom /> */}
                {/* <Input /> */}
                <AddInput />
                {/* <Pmap/> */}
                <button type="button" onClick={() => handleSubmit(submit, console.log)()}>
                    submit
                </button>
            </form>
        </FormProvider>
    );
};

const RouteForm = css`
    display: flex;
    flex-direction: column;
`;

const RowForm = css`
    display: flex;
`

export default NewPost;