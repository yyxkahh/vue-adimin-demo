//将四个模块请求的接口函数统一暴露
import * as trademark from '@/api/product/trademark'
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'
//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu,
    user,
    role,
    permission
}