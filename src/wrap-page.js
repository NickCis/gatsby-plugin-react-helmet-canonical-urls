const React = require('react');
const { Helmet } = require('react-helmet');

module.exports = ({ element, props }, pluginOptions) => {
  if (pluginOptions && pluginOptions.siteUrl) {
    let pathname = props.location.pathname || '/';

    if (pluginOptions.noTrailingSlash && pathname.endsWith('/'))
      pathname = pathname.substring(0, pathname.length -1);

    const myUrl = `${pluginOptions.siteUrl}${pathname}${props.location.search}${props.location.hash}`;

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
