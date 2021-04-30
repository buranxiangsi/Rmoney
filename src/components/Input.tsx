import styled from "styled-components";

const Label = styled.label`
    display: flex;
    align-items: center;
    >span{
      margin-right: 16px;
      white-space: nowrap;//禁止东西一多，内容变成竖的
    }
    >input{
      display: block;
      width: 100%;
      height: 44px;
      border: none;
      background: none;
      
    }
`

type Props = {
  label: string;//props.label
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = (props) => {
  const { label, children, ...rest } = props;
  return (
    <Label>
      <span>{ props.label }</span>
      <input {...rest}/>
    </Label>
  )
}

export {Input}

