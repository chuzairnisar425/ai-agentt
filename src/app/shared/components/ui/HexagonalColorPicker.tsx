import React, { useEffect } from 'react';

interface HexagonalColorPickerProps {
    color?: string;
    onColorChange?: (color: string) => void;
    onColorClick?: (color: string) => void;
}

interface HexagonalColorPickerState {
    color: string;
    selectedColor: string | null; // Track the selected color
}

class HexagonColorPicker extends React.Component<HexagonalColorPickerProps, HexagonalColorPickerState> {
    constructor(props: HexagonalColorPickerProps) {
        super(props);
        this.state = {
            color: props.color || '#ffffff',
            selectedColor: null, // Initialize selected color as null
        };
    }

    componentDidUpdate(prevProps: HexagonalColorPickerProps) {
        if (prevProps.color !== this.props.color) {
            this.setState({ color: this.props.color || '#ffffff' });
        }
        if (this.state.color !== this.state.selectedColor) {
            const selectedColor = this.state.color;
            this.setState({ selectedColor }); // Update selected color on click
        }
    }

    _format_color = (color: string): string => {
        return color.length === 4 ? `#${color.charAt(1).repeat(2)}${color.charAt(2).repeat(2)}${color.charAt(3).repeat(2)}` : color;
    };

    _notify_color_change = (color: string) => {
        const formattedColor = this._format_color(color || this.state.color);
        if (this.props.onColorChange) {
            this.props.onColorChange(formattedColor);
        }
    };

    _on_color_click = (color?: string) => {
        const selectedColor = color || this.state.color;
        this.setState({ selectedColor }); // Update selected color on click

        if (this.props.onColorClick) {
            this.props.onColorClick(this._format_color(selectedColor));
        }
    };

    render() {
        const colorPaths = [
            { fill: '#036', d: 'M72 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#369', d: 'M90 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#36C', d: 'M108 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#039', d: 'M126 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#009', d: 'M144 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#00C', d: 'M162 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#006', d: 'M180 15l-9 5-9-5V5l9-5 9 5z' },
            { fill: '#066', d: 'M63 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#069', d: 'M81 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#09C', d: 'M99 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#06C', d: 'M117 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#03C', d: 'M135 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#00F', d: 'M153 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#33F', d: 'M171 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#339', d: 'M189 30l-9 5-9-5V20l9-5 9 5z' },
            { fill: '#699', d: 'M54 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#099', d: 'M72 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#3CC', d: 'M90 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#0CF', d: 'M108 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#09F', d: 'M126 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#06F', d: 'M144 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#36F', d: 'M162 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#33C', d: 'M180 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#669', d: 'M198 45l-9 5-9-5V35l9-5 9 5z' },
            { fill: '#396', d: 'M45 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#0C9', d: 'M63 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#0FC', d: 'M81 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#0FF', d: 'M99 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#3CF', d: 'M117 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#39F', d: 'M135 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#69F', d: 'M153 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#66F', d: 'M171 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#60F', d: 'M189 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#60C', d: 'M207 60l-9 5-9-5V50l9-5 9 5z' },
            { fill: '#393', d: 'M36 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#0C6', d: 'M54 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#0F9', d: 'M72 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#6FC', d: 'M90 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#6FF', d: 'M108 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#6CF', d: 'M126 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#9CF', d: 'M144 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#99F', d: 'M162 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#96F', d: 'M180 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#93F', d: 'M198 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#90F', d: 'M216 75l-9 5-9-5V65l9-5 9 5z' },
            { fill: '#060', d: 'M27 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#0C0', d: 'M45 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#0F0', d: 'M63 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#6F9', d: 'M81 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#9FC', d: 'M99 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#CFF', d: 'M117 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#CCF', d: 'M135 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#C9F', d: 'M153 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#C6F', d: 'M171 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#C3F', d: 'M189 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#C0F', d: 'M207 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#90C', d: 'M225 90l-9 5-9-5V80l9-5 9 5z' },
            { fill: '#030', d: 'M18 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#093', d: 'M36 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#3C3', d: 'M54 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#6F6', d: 'M72 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#9F9', d: 'M90 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#CFC', d: 'M108 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#FFF', d: 'M126 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#FCF', d: 'M144 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#F9F', d: 'M162 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#F6F', d: 'M180 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#F0F', d: 'M198 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#C0C', d: 'M216 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#606', d: 'M234 105l-9 5-9-5V95l9-5 9 5z' },
            { fill: '#360', d: 'M27 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#090', d: 'M45 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#6F3', d: 'M63 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#9F6', d: 'M81 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#CF9', d: 'M99 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FFC', d: 'M117 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FCC', d: 'M135 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F9C', d: 'M153 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F6C', d: 'M171 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F3C', d: 'M189 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C09', d: 'M207 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#939', d: 'M225 120l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#330', d: 'M36 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#690', d: 'M54 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#9F3', d: 'M72 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#CF6', d: 'M90 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FF9', d: 'M108 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FC9', d: 'M126 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F99', d: 'M144 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F69', d: 'M162 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F39', d: 'M180 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C39', d: 'M198 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#909', d: 'M216 135l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#663', d: 'M45 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#9C0', d: 'M63 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#CF3', d: 'M81 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FF6', d: 'M99 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FC6', d: 'M117 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F96', d: 'M135 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F66', d: 'M153 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F06', d: 'M171 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C69', d: 'M189 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#936', d: 'M207 150l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#996', d: 'M54 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#CC0', d: 'M72 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FF0', d: 'M90 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FC0', d: 'M108 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F93', d: 'M126 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F60', d: 'M144 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#FF5050', d: 'M162 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C06', d: 'M180 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#603', d: 'M198 165l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#963', d: 'M63 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C90', d: 'M81 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F90', d: 'M99 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C60', d: 'M117 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F30', d: 'M135 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#ff0000', d: 'M153 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C00', d: 'M171 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#903', d: 'M189 180l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#630', d: 'M72 195l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#960', d: 'M90 195l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#F8F8F8', d: 'M36 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#DDD', d: 'M54 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#B2B2B2', d: 'M72 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#7F7F7F', d: 'M90 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#5F5F5F', d: 'M108 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#333', d: 'M126 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#151515', d: 'M144 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#000000', d: 'M162 240l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#EAEAEA', d: 'M45 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C8C8C8', d: 'M63 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#969696', d: 'M81 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#777', d: 'M99 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#4D4D4D', d: 'M117 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#292929', d: 'M135 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#0B0B0B', d: 'M153 255l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#C30', d: 'M108 195l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#930', d: 'M126 195l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#900', d: 'M144 195l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#800000', d: 'M162 195l-9 5-9-5v-10l9-5 9 5z' },
            { fill: '#933', d: 'M180 195l-9 5-9-5v-10l9-5 9 5z' },
        ];

        return (
            <svg
                width="250"
                height="260"
                style={{
                    display: 'block',
                    margin: '0 auto',
                    scale: '1',
                }}
            >
                {colorPaths.map((path, index) => (
                    <path
                        style={{
                            cursor: 'pointer',
                        }}
                        key={index}
                        fill={path.fill}
                        d={path.d}
                        stroke={this.state.selectedColor === path.fill ? '#fff' : 'none'}
                        strokeWidth={this.state.selectedColor === path.fill ? 2 : 0}
                        onClick={(e) => this._on_color_click(path.fill)}
                    />
                ))}
            </svg>
        );
    }
}

export default HexagonColorPicker;
