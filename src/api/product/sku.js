//sku模块
import request from '@/utils/request';

//sku列表的接口
///admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => { return request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' }) }

//上架
///admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => { return request({ url: `/admin/product/onSale/${skuId}`, method: 'get' }) }

//下架
///admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => { return request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' }) }

//获取SKU详情的接口
///admin/product/getSkuById/{skuId}  get
export const reqSkuInfo = (skuId) => { return request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' }) }