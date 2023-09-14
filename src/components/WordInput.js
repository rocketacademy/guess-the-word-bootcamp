import React, { useState } from "react";

export default class WordInput extends React.Component {
    constructor(props){
        super(props);
    }
    
    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit();
    }

    handleKeyDown = (event) => {
        //JS Regular Expression (Regex)
        // return /[a-z]/i.test(event.key);

        // const [inputValue, setInputValue] = useState('');

        // const inputChar = event.key.toLowerCase();

        // if (/^[a-zA-Z]$/.test(inputChar)) {
        //     setInputValue(inputChar);
        // }
        // event.preventDefault();
    }

    render() {
      let {input, status} = this.props;
      let element
        if (status === "disabled") {
            element = true;
        } else {
            element = false;
        }
        return (
            <form className="flex flex-row gap-2 justify-center content-center items-center" onSubmit={this.handleSubmit}>
                {element ? "" :   
                    <label className="flex justify-center">
                        <input disabled={element} placeholder="Type here" className="text-black input input-bordered w-full max-w-xs" type="text" value={input} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                    </label>
                }
                {element ? "" :
                    <input className="btn" type="submit" value="Submit"/>
                }
            </form>
        );
    }
}
