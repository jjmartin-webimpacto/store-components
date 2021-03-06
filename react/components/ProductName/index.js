import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import classNames from 'classnames'

import productName from './productName.css'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  static propTypes = {
    /** Name of the product */
    name: PropTypes.string,
    /** Selected SKU name */
    skuName: PropTypes.string,
    /** Show sku */
    showSku: PropTypes.bool,
    /** Product reference */
    productReference: PropTypes.string,
    /** Show product reference */
    showProductReference: PropTypes.bool,
    /** Brand name */
    brandName: PropTypes.string,
    /** Show brand name */
    showBrandName: PropTypes.bool,
    /** Component and content loader styles */
    styles: PropTypes.object,
    /** Classes to be applied to root element */
    className: PropTypes.string,
    /** Classes to be applied to brandName element */
    brandNameClass: PropTypes.string,
    /** Classes to be applied to skuName element */
    skuNameClass: PropTypes.string,
    /** Classes to be applied to productReference element */
    productReferenceClass: PropTypes.string,
    /** Classes to be applied to loader root element */
    loaderClass: PropTypes.string,
    /** HTML tag to be used in the component container */
    tag: PropTypes.oneOf(['div', 'h1', 'h2', 'h3']),
  }

  static defaultProps = {
    showBrandName: false,
    showProductReference: false,
    showSku: false,
    tag: 'div',
  }

  static Loader = (loaderProps = {}) => (
    <div
      className={classNames(
        productName.productNameContainer,
        productName.productNameLoader,
        loaderProps.className
      )}
    >
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={456}
        height={100}
        preserveAspectRatio="xMinYMin meet"
        {...loaderProps}
      >
        <rect
          height="1.125em"
          width="75%"
          x="15%"
          {...loaderProps[productName.productNameBrandLoader]}
        />
        <rect
          height="1.125em"
          width="50%"
          x="25%"
          y="1.75em"
          {...loaderProps[productName.productNameSkuLoader]}
        />
      </ContentLoader>
    </div>
  )

  render() {
    const {
      productReferenceClass,
      brandNameClass,
      skuNameClass,
      loaderClass,
      className,
      name,
      styles,
      skuName,
      showSku,
      brandName,
      showBrandName,
      productReference,
      showProductReference,
      tag: Wrapper,
    } = this.props

    if (!name) {
      return <ProductName.Loader className={loaderClass} {...styles} />
    }

    return (
      <Wrapper
        className={classNames(
          productName.productNameContainer,
          'mv0',
          className
        )}
      >
        <span className={classNames(productName.productBrand, brandNameClass)}>
          {name} {showBrandName && brandName && `- ${brandName}`}
        </span>
        {showSku && skuName && (
          <span className={classNames(productName.productBrand, skuNameClass)}>
            {skuName}
          </span>
        )}
        {showProductReference && productReference && (
          <span
            className={classNames(
              productName.productReference,
              productReferenceClass
            )}
          >
            {`REF: ${productReference}`}
          </span>
        )}
      </Wrapper>
    )
  }
}

ProductName.schema = {
  title: 'admin/editor.productName.title',
  description: 'admin/editor.productName.description',
  type: 'object',
  properties: {
    showBrandName: {
      type: 'boolean',
      title: 'admin/editor.productName.showBrandName.title',
      default: false,
      isLayout: true,
    },
    showSku: {
      type: 'boolean',
      title: 'admin/editor.productName.showSku.title',
      default: false,
      isLayout: true,
    },
    showProductReference: {
      type: 'boolean',
      title: 'admin/editor.productName.showProductReference.title',
      default: false,
      isLayout: true,
    },
  },
}

export default ProductName
