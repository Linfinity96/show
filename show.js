// 存储人员列表
    let personnelArray = [];
        
    // 添加人员按钮点击事件
    document.getElementById('addPersonBtn').addEventListener('click', function() {
        const position = document.getElementById('personPosition').value;
        const name = document.getElementById('personName').value.trim();
        
        if (name) {
            // 添加到人员数组
            personnelArray.push({ position, name });
            
            // 更新人员列表显示
            updatePersonnelList();
            
            // 清空姓名输入框
            document.getElementById('personName').value = '';
            
            // 清除人员错误提示
            hideError('personnel');
        } else {
            alert('请输入人员姓名');
        }
    });
    
    // 更新人员列表显示
    function updatePersonnelList() {
        const personnelList = document.getElementById('personnelList');
        
        if (personnelArray.length > 0) {
            personnelList.style.display = 'block';
            
            // 清空列表
            personnelList.innerHTML = '';
            
            // 添加每个人员项
            personnelArray.forEach((person, index) => {
                const item = document.createElement('div');
                item.className = 'personnel-item';
                
                const text = document.createElement('span');
                text.textContent = `${person.position}：${person.name}`;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = '删除';
                removeBtn.onclick = function() {
                    personnelArray.splice(index, 1);
                    updatePersonnelList();
                    
                    // 如果删除后人员列表为空，显示错误提示
                    if (personnelArray.length === 0) {
                        showError('personnel', '请添加至少一名人员');
                    }
                };
                
                item.appendChild(text);
                item.appendChild(removeBtn);
                personnelList.appendChild(item);
            });
        } else {
            personnelList.style.display = 'none';
        }
    }
    
    // 显示错误提示
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // 为对应的输入框添加错误样式
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.classList.add('input-error');
            }
        }
    }
    
    // 隐藏错误提示
    function hideError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
            
            // 移除对应输入框的错误样式
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.classList.remove('input-error');
            }
        }
    }
    
    // 显示模态框
    function showModal(message) {
        document.getElementById('errorModalBody').textContent = message;
        document.getElementById('errorModal').style.display = 'block';
    }
    
    // 关闭模态框
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('errorModal').style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('errorModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 场景类型切换逻辑
    document.getElementById('scenarioType').addEventListener('change', function() {
        const scenarioType = this.value;
        const themeScenarioGroup = document.getElementById('themeScenarioGroup');
        const listScenarioGroup = document.getElementById('listScenarioGroup');
        
        // 隐藏所有场景子选项
        themeScenarioGroup.style.display = 'none';
        listScenarioGroup.style.display = 'none';
        
        // 根据选择显示对应的子选项
        if (scenarioType === '主题场景') {
            themeScenarioGroup.style.display = 'block';
        } else if (scenarioType === '指定清单场景') {
            listScenarioGroup.style.display = 'block';
        }
    });
    
    // 验证表单
    function validateForm() {
        let isValid = true;
        let emptyFields = [];
        
        // 验证分公司
        const company = document.getElementById('company').value;
        if (!company) {
            showError('company', '请选择分公司');
            isValid = false;
            emptyFields.push('分公司');
        } else {
            hideError('company');
        }
        
        // 验证网格名称
        const gridName = document.getElementById('gridName').value;
        if (!gridName) {
            showError('gridName', '请选择网格名称');
            isValid = false;
            emptyFields.push('网格名称');
        } else {
            hideError('gridName');
        }
        
        // 验证场景类型
        const scenarioType = document.getElementById('scenarioType').value;
        if (!scenarioType) {
            showError('scenarioType', '请选择场景类型');
            isValid = false;
            emptyFields.push('场景类型');
        } else {
            hideError('scenarioType');
            
            // 根据场景类型验证子选项
            if (scenarioType === '主题场景') {
                const themeScenario = document.getElementById('themeScenario').value;
                if (!themeScenario) {
                    showError('themeScenario', '请选择主题场景类型');
                    isValid = false;
                    emptyFields.push('主题场景类型');
                } else {
                    hideError('themeScenario');
                }
            } else if (scenarioType === '指定清单场景') {
                const listScenario = document.getElementById('listScenario').value;
                if (!listScenario) {
                    showError('listScenario', '请选择指定清单场景类型');
                    isValid = false;
                    emptyFields.push('指定清单场景类型');
                } else {
                    hideError('listScenario');
                }
            }
        }
        
        // 删除或注释掉这段代码，因为不再需要验证 activityScenario
        /*
        // 验证场景
        const activityScenario = document.getElementById('activityScenario').value.trim();
        if (!activityScenario) {
            showError('activityScenario', '请输入场景');
            isValid = false;
            emptyFields.push('促销/拜访类型的场景');
        } else {
            hideError('activityScenario');
        }
        */
        
        // 验证时间
        const time = document.getElementById('time').value;
        if (!time) {
            showError('time', '请选择时间');
            isValid = false;
            emptyFields.push('促销/拜访时间');
        } else {
            hideError('time');
        }
        
        // 验证地点
        const location = document.getElementById('location').value.trim();
        if (!location) {
            showError('location', '请输入地点');
            isValid = false;
            emptyFields.push('促销/拜访地点');
        } else {
            hideError('location');
        }
        
        // 验证人员
        if (personnelArray.length === 0) {
            showError('personnel', '请添加至少一名人员');
            isValid = false;
            emptyFields.push('促销/拜访人员');
        } else {
            hideError('personnel');
        }
        
        // 验证业务
        const business = document.getElementById('business').value.trim();
        if (!business) {
            showError('business', '请输入成交业务');
            isValid = false;
            emptyFields.push('促销/拜访成交业务');
        } else {
            hideError('business');
        }
        
        // 验证效果
        const effect = document.getElementById('effect').value.trim();
        if (!effect) {
            showError('effect', '请输入促销/拜访效果');
            isValid = false;
            emptyFields.push('促销/拜访效果');
        } else {
            hideError('effect');
        }
        
        // 如果验证失败，显示模态框
        if (!isValid) {
            const message = `以下项目未填写：\n${emptyFields.join('\n')}`;
            showModal(message);
        }
        
        return isValid;
    }
    
    // 在validateForm函数中添加验证逻辑
    function validateForm() {
        let isValid = true;
        let emptyFields = [];
        
        // 验证分公司
        const company = document.getElementById('company').value;
        if (!company) {
            showError('company', '请选择分公司');
            isValid = false;
            emptyFields.push('分公司');
        } else {
            hideError('company');
        }
        
        // 验证网格名称
        const gridName = document.getElementById('gridName').value;
        if (!gridName) {
            showError('gridName', '请选择网格名称');
            isValid = false;
            emptyFields.push('网格名称');
        } else {
            hideError('gridName');
        }
        
        // 验证场景类型
        const scenarioType = document.getElementById('scenarioType').value;
        if (!scenarioType) {
            showError('scenarioType', '请选择场景类型');
            isValid = false;
            emptyFields.push('场景类型');
        } else {
            hideError('scenarioType');
            
            // 根据场景类型验证子选项
            if (scenarioType === '主题场景') {
                const themeScenario = document.getElementById('themeScenario').value;
                if (!themeScenario) {
                    showError('themeScenario', '请选择主题场景类型');
                    isValid = false;
                    emptyFields.push('主题场景类型');
                } else {
                    hideError('themeScenario');
                }
            } else if (scenarioType === '指定清单场景') {
                const listScenario = document.getElementById('listScenario').value;
                if (!listScenario) {
                    showError('listScenario', '请选择指定清单场景类型');
                    isValid = false;
                    emptyFields.push('指定清单场景类型');
                } else {
                    hideError('listScenario');
                }
            }
        }
        
        // 删除或注释掉这段代码，因为不再需要验证 activityScenario
        /*
        // 验证场景
        const activityScenario = document.getElementById('activityScenario').value.trim();
        if (!activityScenario) {
            showError('activityScenario', '请输入场景');
            isValid = false;
            emptyFields.push('促销/拜访类型的场景');
        } else {
            hideError('activityScenario');
        }
        */
        
        // 验证时间
        const time = document.getElementById('time').value;
        if (!time) {
            showError('time', '请选择时间');
            isValid = false;
            emptyFields.push('促销/拜访时间');
        } else {
            hideError('time');
        }
        
        // 验证地点
        const location = document.getElementById('location').value.trim();
        if (!location) {
            showError('location', '请输入地点');
            isValid = false;
            emptyFields.push('促销/拜访地点');
        } else {
            hideError('location');
        }
        
        // 验证人员
        if (personnelArray.length === 0) {
            showError('personnel', '请添加至少一名人员');
            isValid = false;
            emptyFields.push('促销/拜访人员');
        } else {
            hideError('personnel');
        }
        
        // 验证业务
        const business = document.getElementById('business').value.trim();
        if (!business) {
            showError('business', '请输入成交业务');
            isValid = false;
            emptyFields.push('促销/拜访成交业务');
        } else {
            hideError('business');
        }
        
        // 验证效果
        const effect = document.getElementById('effect').value.trim();
        if (!effect) {
            showError('effect', '请输入促销/拜访效果');
            isValid = false;
            emptyFields.push('促销/拜访效果');
        } else {
            hideError('effect');
        }
        
        // 验证是否物业类集团
        const isProperty = document.getElementById('isProperty').value;
        if (!isProperty) {
            showError('isProperty', '如果走访地点包含物业，选填：是');
            isValid = false;
            emptyFields.push('是否物业类集团');
        } else {
            hideError('isProperty');
        }
        
        // 验证是否企宽集团
        const isEnterpriseGroup = document.getElementById('isEnterpriseGroup').value;
        if (!isEnterpriseGroup) {
            showError('isEnterpriseGroup', '如果走访地点包含企业集团，选填：是');
            isValid = false;
            emptyFields.push('是否企宽集团');
        } else {
            hideError('isEnterpriseGroup');
        }
        
        // 如果验证失败，显示模态框
        if (!isValid) {
            const message = `以下项目未填写：\n${emptyFields.join('\n')}`;
            showModal(message);
        }
        
        return isValid;
    }
    
    // 为所有输入框添加输入事件监听，在输入时隐藏错误提示
    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('input', function() {
            const id = this.id;
            if (id) {
                hideError(id);
            }
        });
    });
    
    // 生成结果文本
    document.getElementById('generateBtn').addEventListener('click', function() {
        if (validateForm()) {
            const gridName = document.getElementById('gridName').value.trim();
            const scenarioType = document.getElementById('scenarioType').value;
            let scenarioDetail = '';
            
            if (scenarioType === '主题场景') {
                scenarioDetail = document.getElementById('themeScenario').value;
            } else if (scenarioType === '指定清单场景') {
                scenarioDetail = document.getElementById('listScenario').value;
            }
            
            const activityType = document.getElementById('activityType').value;
            const time = document.getElementById('time').value;
            const location = document.getElementById('location').value.trim();
            const business = document.getElementById('business').value.trim();
            const effect = document.getElementById('effect').value.trim();
            const isProperty = document.getElementById('isProperty').value;
            const isEnterpriseGroup = document.getElementById('isEnterpriseGroup').value;
            
            // 格式化日期
            const formattedDate = formatDate(time);
            
            // 格式化人员信息
            let personnelText = '';
            personnelArray.forEach(person => {
                personnelText += `${person.position}${person.name} `;
            });
            
            // 生成结果文本
            let resultText = `【${gridName}-${scenarioType}：${scenarioDetail} ${activityType}】\n`;
            resultText += `1、${activityType}时间：${formattedDate}\n`;
            resultText += `2、${activityType}地点：${location}\n`;
            resultText += `3、${activityType}人员：${personnelText}\n`;
            resultText += `4、${activityType}成交业务：${business}\n`;
            resultText += `5、${activityType}效果：${effect}\n`;
            resultText += `6、走访集团是否物业类：${isProperty}\n`;
            resultText += `7、走访集团是否企宽集团：${isEnterpriseGroup}`;
            
            // 显示结果
            document.getElementById('resultText').textContent = resultText;
            document.getElementById('resultContainer').style.display = 'block';
        }
    });
    
    // 格式化日期函数
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        return `${year}年${month}月${day}日`;
    }
    
    document.getElementById('copyBtn').addEventListener('click', function() {
        const resultText = document.getElementById('resultText').textContent;
        
        // 兼容性更好的复制到剪贴板方法
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // 现代浏览器API
            navigator.clipboard.writeText(resultText).then(function() {
                alert('已复制到剪贴板！');
            }).catch(function(err) {
                fallbackCopyTextToClipboard(resultText);
            });
        } else {
            // 回退方法
            fallbackCopyTextToClipboard(resultText);
        }
    });
    
    // 添加回退复制方法
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // 设置样式使文本域不可见
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = 0;
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('已复制到剪贴板！');
            } else {
                alert('复制失败，请手动复制');
            }
        } catch (err) {
            alert('复制失败，请手动复制：' + err);
        }
        
        document.body.removeChild(textArea);
    }
    
    // 添加在文件开头
    // 网格数据
    const gridData = {
        "江城分公司": ["城南网格", "东风三网格", "东门网格", "建设路网格", "石湾网格"],
        "阳春分公司": ["河西网格", "城北网格", "春湾网格", "合水网格", "潭水网格", "三甲网格", "城云网格", "朝南网格"],
        "阳东分公司": ["合山网格", "东城网格", "北惯网格", "红丰网格", "东平网格", "昌和网格"],
        "阳西分公司": ["溪头网格", "儒洞网格", "金湖湾网格", "东湖网格", "人道网格"],
        "南区分公司": ["白沙网格", "沿江路网格", "金源路网格", "平岗网格"]
    };
    
    // 更新网格选项
    function updateGridOptions() {
        
        const companySelect = document.getElementById('company');
        const gridSelect = document.getElementById('gridName');
        
        // 清空当前网格选项
        gridSelect.innerHTML = '';
        
        // 获取选中的分公司
        const selectedCompany = companySelect.value;
        
        // 添加默认选项
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        
        if (!selectedCompany) {
            defaultOption.textContent = '请先选择分公司';
            gridSelect.appendChild(defaultOption);
            return;
        }
        
        defaultOption.textContent = '请选择网格';
        gridSelect.appendChild(defaultOption);
        console.log(selectedCompany)
        
        // 添加对应分公司的网格选项
        const grids = gridData[selectedCompany] || [];
        grids.forEach(grid => {
            const option = document.createElement('option');
            option.value = grid;
            option.textContent = grid;
            gridSelect.appendChild(option);
        });
    }

// 在文件开头添加
// 从localStorage加载场景类型数据
function loadScenarioOptions() {
    // 加载主题场景类型
    const themeScenarioSelect = document.getElementById('themeScenario');
    const themeScenarios = JSON.parse(localStorage.getItem('themeScenarios')) || [
        "大集团", "酒店", "幼儿园", "商圈", "大型社区"
    ];
    
    // 清空当前选项（保留第一个默认选项）
    while (themeScenarioSelect.options.length > 1) {
        themeScenarioSelect.remove(1);
    }
    
    // 添加场景类型选项
    themeScenarios.forEach(scenario => {
        const option = document.createElement('option');
        option.value = scenario;
        option.textContent = scenario;
        themeScenarioSelect.appendChild(option);
    });
    
    // 加载指定清单场景类型
    const listScenarioSelect = document.getElementById('listScenario');
    const listScenarios = JSON.parse(localStorage.getItem('listScenarios')) || [
        "重点小区", "漫入社区", "重点集团", "百万集团", "乡村"
    ];
    
    // 清空当前选项（保留第一个默认选项）
    while (listScenarioSelect.options.length > 1) {
        listScenarioSelect.remove(1);
    }
    
    // 添加场景类型选项
    listScenarios.forEach(scenario => {
        const option = document.createElement('option');
        option.value = scenario;
        option.textContent = scenario;
        listScenarioSelect.appendChild(option);
    });
}

// 在文件末尾添加，确保在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载场景类型选项
    loadScenarioOptions();
});

    // MD5加密函数
    async function md5(message) {
        // 将字符串转换为UTF-8编码的ArrayBuffer
        const msgBuffer = new TextEncoder().encode(message);
        // 使用SubtleCrypto API计算哈希值
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        // 将ArrayBuffer转换为十六进制字符串
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    // 显示密码验证模态框
    function showPasswordModal() {
        document.getElementById('passwordModal').style.display = 'block';
        document.getElementById('passwordInput').value = '';
        document.getElementById('password-error').style.display = 'none';
    }
    
    // 关闭密码验证模态框
    document.getElementById('cancelPassword').addEventListener('click', function() {
        document.getElementById('passwordModal').style.display = 'none';
    });
    
    // 验证密码并跳转
    document.getElementById('confirmPassword').addEventListener('click', async function() {
        const password = document.getElementById('passwordInput').value;
       
        // 正确密码的SHA-256哈希值
        const correctPasswordHash = 'e9300549df9994f1f311fa42304d8017d88149e1f8ab583394edb714934eb3d3';
        
        // 计算输入密码的哈希值
        const passwordHash = await md5(password);
        console.log(passwordHash);
        if (passwordHash === correctPasswordHash) {
            // 密码正确，跳转到设置页面
            window.location.href = 'setting.html';
        } else {
            // 密码错误，显示错误信息
            document.getElementById('password-error').style.display = 'block';
        }
    });
    
    // 密码输入框回车事件
    document.getElementById('passwordInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('confirmPassword').click();
        }
    });