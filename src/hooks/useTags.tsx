import { useEffect, useState } from "react";
import { useUpdate } from "./useUpdate";
import { createId } from "../lib/createId";

const useTags =()=>{//封装一个自定义hook
  const [tags, setTags] = useState<{id:number; name: string}[]>([])
  useEffect(() => {
    let localTags =JSON.parse(window.localStorage.getItem('tags')||'[]')
    if (localTags.length === 0) {
      localTags = [
        {id: createId(), name:'衣'},
        {id: createId(), name:'食'},
        {id: createId(), name:'住'},
        {id: createId(), name:'行'},
      ]
    }
    setTags(localTags)
  }, [])//组件挂载时执行 
  useUpdate(() => {
    window.localStorage.setItem('tags',JSON.stringify(tags))
  },tags)
  const findTag = (id: number) => tags.filter(tag => tag.id === id)[0]
  const findTagIndex = (id: number) => {
    let result = -1
    for (let i = 0; i < tags.length;i++){
      if (tags[i].id === id) {
        result = i
        break;
      }
    }
    return result;
  }
  const updateTag = (id: number, {name}: { name: string }) => {
    setTags(tags.map(tag =>  tag.id === id ? { id, name } : tag))
    // setTags(tags.filter(tag=> tag.id!== id))
    // const index = findTagIndex(id)
    // //深拷贝tags得到tagsClone
    // const tagsClone = JSON.parse(JSON.stringify(tags))
    // //把tagsClone的第index删掉，换成id: id, name:obj.name
    // tagsClone.splice(index, 1, { id: id, name:obj.name})
    // setTags(tagsClone)

  }
  const deleteTag = (id: number) => {
    setTags(tags.filter(tag=> tag.id!== id))
    // const index = findTagIndex(id)
    // const tagsClone = JSON.parse(JSON.stringify(tags))
    // tagsClone.splice(index, 1)
    // setTags(tagsClone)
  }
  const addTag = ()=>{
    const tagName = window.prompt('新标签的名称是: ')
    if(tagName !== null && tagName!==''){
      setTags([...tags, {id:createId(),name:tagName}])
    }
  }
  const getName = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0]
    return tag? tag.name : ''
  }
      
  return { tags, getName, addTag,setTags, findTag, updateTag, findTagIndex, deleteTag }
}

  export {useTags}