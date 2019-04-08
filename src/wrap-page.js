const React = require('react');
const { Helmet } = require('react-helmet');

const isExcluded = (collection, element) =>
  Array.isArray(collection) && collection.includes(element.replace(/\/+$/, ''));

module.exports = ({ element, props }, pluginOptions) => {
  if (
    pluginOptions &&
    pluginOptions.siteUrl &&
    !isExcluded(pluginOptions.exclude, props.location.pathname)
  ) {
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
