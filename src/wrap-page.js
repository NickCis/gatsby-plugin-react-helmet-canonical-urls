const React = require('react');
const { Helmet } = require('react-helmet');

const isExcluded = (excludes, element) => {
  if (!Array.isArray(excludes))
    return false;

  element = element.replace(/\/+$/, '');

  return excludes.some(exclude => {
    if (exclude instanceof RegExp)
      return element.match(exclude);
    return exclude.includes(element);
  });
}

module.exports = ({ element, props }, pluginOptions) => {
  if (
    pluginOptions &&
    pluginOptions.siteUrl &&
    !isExcluded(pluginOptions.exclude, props.location.pathname)
  ) {
    let pathname = props.location.pathname || '/';

    if (pluginOptions.noTrailingSlash && pathname.endsWith('/'))
      pathname = pathname.substring(0, pathname.length - 1);

    const myUrl = `${pluginOptions.siteUrl}${pathname}${props.location.search}${
      props.location.hash
    }`;

    return (
      <>
        <Helmet
          link={[
            {
              rel: 'canonical',
              key: myUrl,
              href: myUrl,
            },
          ]}
        />
        {element}
      </>
    );
  }

  return element;
};
