import React from "react";
import PropTypes from "prop-types";
import getIconType from "../../helpers/getIconType";
import { size as iconSize, Colors } from "../../theme";

function Icon({
    name,
    family,
    size,
    color,
    styles,
    theme,
    medium,
    large,
    ...rest
}) {
    const IconInstance = getIconType(family);
    if (name && IconInstance) {
        return (
            <IconInstance
                name={name}
                size={
                    size ||
                    (medium
                        ? iconSize.ICON_MEDIUM
                        : large
                            ? iconSize.ICON_LARGE
                            : iconSize.ICON)
                }
                color={color || Colors.BLACK}
                {...rest}
            />
        );
    }

    return null;
}

Icon.defaultProps = {
    name: null,
    family: null,
    size: null,
    color: null,
    styles: {},
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    styles: PropTypes.any,
};

export default Icon;
