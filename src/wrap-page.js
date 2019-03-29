const React = require("react");
const { Helmet } = require("react-helmet");

module.exports = ({ element, props }, pluginOptions) => {
    if (pluginOptions && pluginOptions.siteUrl) {
        let path = "";
        if (pluginOptions.noTrailingSlash)
            path =
                props.location.pathname !== "/"
                    ? props.location.pathname || ""
                    : "";
        else path = props.location.pathname || "";

        const myUrl = `${pluginOptions.siteUrl}${path}${props.location.search}${
            props.location.hash
        }`;

        return (
            <>
                <Helmet
                    link={[
                        {
                            rel: "canonical",
                            key: myUrl,
                            href: myUrl
                        }
                    ]}
                />
                {element}
            </>
        );
    }

    return element;
};
