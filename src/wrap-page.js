const React = require('react');
const { Helmet } = require('react-helmet');

module.exports = ({ element, props }, pluginOptions) => {
  if (pluginOptions && pluginOptions.siteUrl) {
    const myUrl = `${pluginOptions.siteUrl}${props.location.pathname || '/'}${props.location.search}${props.location.hash}`;

    return (
      <>
        <Helmet
          link={[
            {
              rel: 'canonical',
              key: myUrl,
              href: myUrl,
            }
          ]}
        />
        {element}
      </>
    );
  }

  return element;
};
