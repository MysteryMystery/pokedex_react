import React from "react";

export default class ProgressBar extends React.Component {
    render() {
        return <div className="relative pt-1">
            <div className={"overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700" }
                style={{backgroundColor: this.props.bg ?? ""}}
            >
                <div style={{ width: this.props.width ?? "0%", backgroundColor: this.props.fg }}
                     className={"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center "}>
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}
