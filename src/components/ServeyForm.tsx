import { useForm } from 'react-hook-form'
import './ServeyForm.css'
import { DevTool } from '@hookform/devtools';
import { useState } from 'react';

type FormValues = {
    name: string
    email: string
    dob: Date
    language: string
    jobtype: string
    comments: string
}

export const ServeyForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState, getValues } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log("Form Submitted", data);
        setIsSubmitted(true);
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("name", {
                    required: {
                        value: true,
                        message: "Username is required.",
                    }
                })} />
                {errors.name?.message ? <p className="errors">{errors.name?.message}</p> : ''}
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required.",
                    },
                    pattern: {
                        value: /^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i,
                        message: "Please enter a valid email address."
                    },
                    validate: {
                        notAdmin: (fieldValue) => {
                            return (
                                fieldValue !== "admin@example.com" || "Enter different email address."
                            )
                        },  // We can create many more custom rules like this.
                    }
                })} />
                {errors.email?.message ? <p className="errors">{errors.email?.message}</p> : ''}
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" {...register("dob", {
                    required: {
                        value: true,
                        message: "Date of Birthday is required"
                    },
                    validate:{
                        isLessThanToday:(value) => {
                            const today = new Date();
                            let dob=new Date(value);
                            if(dob > today){
                                return 'You are from the future!';
                            }
                        },
                    }
                })} />
                {errors.dob?.message ? <p className="errors">{errors.dob?.message}</p> : ''}
                <fieldset className='competency'>
                    <legend>What is your favorite programming language?</legend>
                    <input type="radio" id="js" value="JavaScript" {...register("language", {
                        required: {
                            value: true,
                            message: "You must choose a language."
                        }
                    })} />
                    <label htmlFor="js">JavaScript</label><br />
                    <input type="radio" id="csharp" value="C#" {...register("language")} />
                    <label htmlFor="csharp">C#</label><br />
                    <input type="radio" id="java" value="Java" {...register("language")} />
                    <label htmlFor="java">Java</label>
                </fieldset>
                {errors.language?.message ? <p className="errors">{errors.language?.message}</p> : ''}
                <fieldset>
                    <legend>Which type of job are you applying for?</legend>
                    <select id="jobType" {...register("jobtype", {
                        required: {
                            value: true,
                            message: "You must choose a job type."
                        }
                    })}>
                        <option value="">Select Role</option>
                        <option value="frontend">Front End Developer</option>
                        <option value="backend">Back End Developer</option>
                        <option value="design">UI/UX Designer</option>
                    </select>
                </fieldset>
                {errors.jobtype?.message ? <p className="errors">{errors.jobtype?.message}</p> : ''}
                <label htmlFor="comments">Additional comments:</label>
                <textarea id="comments" {...register("comments", {
                    maxLength: 250,
                })}></textarea>
                {errors.comments?.message ? <p className="errors">{errors.comments?.message}</p> : ''}
                <input type="submit" id="submit" value="Submit" />
            </form>
            <div className='spiral'>
                {
                    isSubmitted ? (
                        getValues("name").split("").map((char, i) => (
                            <div className='character' key={i} style={{animationDelay: `-${i* (4000 / 16)}ms`}}>{char}</div>
                        ))
                    ) : null
                }
            </div>
            <div className='spiral2'>
                {
                    isSubmitted ? (
                        "You are welcome".split("").map((char, i) => (
                            <div className='character' key={i} style={{animationDelay: `-${Math.abs((i * (4000 / 16)) - 2000)}ms`}}>{char}</div>
                        ))
                    ) : null
                }
            </div>
            <DevTool control={control} />
        </div>
    )
}
