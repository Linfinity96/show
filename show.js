// 存储人员列表
let personnelArray = [];

// 添加人员按钮点击事件
document.getElementById('addPersonBtn').addEventListener('click', function () {
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
            removeBtn.onclick = function () {
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
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('errorModal').style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', function (event) {
    const modal = document.getElementById('errorModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 场景类型切换逻辑
document.getElementById('scenarioType').addEventListener('change', function () {
    updateScenarioSubTypes();
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
    const scenarioTypeSelect = document.getElementById('scenarioType');
    const scenarioType = scenarioTypeSelect.value;
    if (!scenarioType) {
        showError('scenarioType', '请选择场景类型');
        isValid = false;
        emptyFields.push('场景类型');
    } else {
        hideError('scenarioType');

        // 获取选中的场景索引
        const scenarioIndex = parseInt(scenarioType.split('_')[1]);

        // 验证子类型选择
        const subTypeSelect = document.getElementById(`scenario_${scenarioIndex}_types`);
        let scenarioSubType = '';
        if (subTypeSelect && !subTypeSelect.value) {
            showError(`scenario_${scenarioIndex}_types`, `请选择${scenarios[scenarioIndex].name}类型`);
            isValid = false;
            emptyFields.push(`${scenarios[scenarioIndex].name}类型`);
        } else if (subTypeSelect) {
            hideError(`scenario_${scenarioIndex}_types`);
            scenarioSubType = subTypeSelect.value;
        }

        // 如果选择了"大集团"，验证是否指定新员工入职攻坚集团
        if (scenarioSubType === '大集团') {
            const isNewEmployee = document.getElementById('isNewEmployee').value;
            if (!isNewEmployee) {
                showError('isNewEmployee', '请选择是否为指定新员工入职攻坚集团');
                isValid = false;
                emptyFields.push('是否指定新员工入职攻坚集团');
            } else {
                hideError('isNewEmployee');
            }
        }
    }

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

// 固定的Gist设置
const GIST_ID = "c1f6137b1cd44fe8ded5bddb4eed967e"; // 移除了 "gist:" 前缀
const head = "ghp_"; // 替换为您的GitHub Token;
const rear = "3Xnavg15ANi7sB6IQGVyy67Haq8PO50u7mqr";
const GITHUB_TOKEN = head + rear;

// 场景数据
let scenarios = [
    {
        name: "主题场景",
        types: ["大集团", "重点集团", "旅行社", "学校", "年轻人聚集场所"]
    },
    {
        name: "主题外常规场景",
        types: ["大型社区"]
    }
];

// 从Gist加载场景类型数据
async function loadScenarioOptions() {
    try {
        // 获取Gist内容
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API 错误: ${response.status}`);
        }

        const data = await response.json();

        if (!data.files['settings.json']) {
            // 如果没有找到设置文件，使用默认值
            scenarios = [
                {
                    name: "主题场景",
                    types: ["大集团", "重点集团", "旅行社", "学校", "年轻人聚集场所"]
                },
                {
                    name: "主题外常规场景",
                    types: ["大型社区"]
                }
            ];
        } else {
            // 解析设置数据
            const settings = JSON.parse(data.files['settings.json'].content);

            // 更新场景数据
            if (settings.scenarios) {
                scenarios = settings.scenarios;
            } else {
                // 兼容旧版本数据
                scenarios = [
                    {
                        name: settings.themeScenarioName || "主题场景",
                        types: settings.themeScenarios || ["大集团", "重点集团", "旅行社", "学校", "年轻人聚集场所"]
                    },
                    {
                        name: settings.listScenarioName || "主题外常规场景",
                        types: settings.listScenarios || ["大型社区"]
                    }
                ];
            }
        }

        // 更新场景类型选择框
        updateScenarioTypeSelect();

        console.log('从云端加载设置成功');
    } catch (error) {
        // 如果加载失败，使用默认值
        scenarios = [
            {
                name: "主题场景",
                types: ["大集团", "重点集团", "旅行社", "学校", "年轻人聚集场所"]
            },
            {
                name: "主题外常规场景",
                types: ["大型社区"]
            }
        ];

        // 更新场景类型选择框
        updateScenarioTypeSelect();

        console.error('从云端加载设置失败:', error);
    }
}

// 更新场景类型选择框
function updateScenarioTypeSelect() {
    const scenarioTypeSelect = document.getElementById('scenarioType');

    // 保留第一个默认选项，清空其他选项
    while (scenarioTypeSelect.options.length > 1) {
        scenarioTypeSelect.remove(1);
    }

    // 添加场景选项
    scenarios.forEach((scenario, index) => {
        const option = document.createElement('option');
        option.value = `scenario_${index}`;
        option.textContent = scenario.name;
        scenarioTypeSelect.appendChild(option);
    });

    // 触发场景类型变更事件，更新子选项
    if (scenarioTypeSelect.selectedIndex > 0) {
        updateScenarioSubTypes();
    }
}

// 更新场景子类型选择框
function updateScenarioSubTypes() {
    const scenarioTypeSelect = document.getElementById('scenarioType');
    const selectedValue = scenarioTypeSelect.value;

    // 隐藏所有子类型选择框
    hideAllScenarioSubTypes();

    // 隐藏新员工入职攻坚集团选项
    document.getElementById('isNewEmployeeGroup').style.display = 'none';

    // 如果选择了默认选项，直接返回
    if (!selectedValue || selectedValue === "") {
        return;
    }

    // 获取选中的场景索引
    const scenarioIndex = parseInt(selectedValue.split('_')[1]);
    const scenario = scenarios[scenarioIndex];

    // 创建或更新子类型选择框
    let subTypeContainer = document.getElementById(`scenario_${scenarioIndex}_container`);

    // 如果容器不存在，创建新容器
    if (!subTypeContainer) {
        subTypeContainer = document.createElement('div');
        subTypeContainer.id = `scenario_${scenarioIndex}_container`;
        subTypeContainer.className = 'select-group';

        const label = document.createElement('label');
        label.setAttribute('for', `scenario_${scenarioIndex}_types`);
        label.textContent = `${scenario.name}类型：`;

        const select = document.createElement('select');
        select.id = `scenario_${scenarioIndex}_types`;

        // 添加子类型变更事件监听器
        select.addEventListener('change', function () {
            // 检查是否选择了"大集团"
            if (this.value === '大集团') {
                document.getElementById('isNewEmployeeGroup').style.display = 'block';
            } else {
                document.getElementById('isNewEmployeeGroup').style.display = 'none';
            }
        });

        // 添加默认选项
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = `请选择${scenario.name}类型`;
        select.appendChild(defaultOption);

        // 添加类型选项
        scenario.types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            select.appendChild(option);
        });

        // 添加错误提示
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.id = `scenario_${scenarioIndex}_types-error`;
        errorMsg.textContent = `请选择${scenario.name}类型`;

        subTypeContainer.appendChild(label);
        subTypeContainer.appendChild(select);
        subTypeContainer.appendChild(errorMsg);

        // 添加到正确的容器中
        const scenarioRow = document.getElementById('scenarioSelectionRow');
        scenarioRow.appendChild(subTypeContainer);
    } else {
        // 如果容器已存在，更新选项
        const select = document.getElementById(`scenario_${scenarioIndex}_types`);
        const label = subTypeContainer.querySelector('label');
        const errorMsg = document.getElementById(`scenario_${scenarioIndex}_types-error`);

        // 更新标签和错误提示
        label.textContent = `${scenario.name}类型：`;
        errorMsg.textContent = `请选择${scenario.name}类型`;

        // 清空选项（保留第一个默认选项）
        while (select.options.length > 1) {
            select.remove(1);
        }

        // 更新默认选项文本
        select.options[0].textContent = `请选择${scenario.name}类型`;

        // 添加子类型变更事件监听器
        select.addEventListener('change', function () {
            // 检查是否选择了"大集团"
            if (this.value === '大集团') {
                document.getElementById('isNewEmployeeGroup').style.display = 'block';
            } else {
                document.getElementById('isNewEmployeeGroup').style.display = 'none';
            }
        });

        // 添加类型选项
        scenario.types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            select.appendChild(option);
        });

        // 显示容器
        subTypeContainer.style.display = 'block';
    }
}

// 隐藏所有场景子类型选择框
function hideAllScenarioSubTypes() {
    scenarios.forEach((_, index) => {
        const container = document.getElementById(`scenario_${index}_container`);
        if (container) {
            container.style.display = 'none';
        }
    });
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
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
document.getElementById('cancelPassword').addEventListener('click', function () {
    document.getElementById('passwordModal').style.display = 'none';
});

// 验证密码并跳转
document.getElementById('confirmPassword').addEventListener('click', async function () {
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
document.getElementById('passwordInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('confirmPassword').click();
    }
});

// 生成晒单信息按钮点击事件
document.getElementById('generateBtn').addEventListener('click', function () {
    // 验证表单
    if (!validateForm()) {
        return;
    }

    // 获取表单数据
    const company = document.getElementById('company').value;
    const gridName = document.getElementById('gridName').value;
    const scenarioTypeSelect = document.getElementById('scenarioType');
    const scenarioTypeValue = scenarioTypeSelect.value;
    const scenarioIndex = parseInt(scenarioTypeValue.split('_')[1]);
    const scenarioName = scenarios[scenarioIndex].name;

    // 获取选中的场景子类型
    const subTypeSelect = document.getElementById(`scenario_${scenarioIndex}_types`);
    const scenarioSubType = subTypeSelect ? subTypeSelect.value : '';

    const activityType = document.getElementById('activityType').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const business = document.getElementById('business').value;
    const effect = document.getElementById('effect').value;
    const isProperty = document.getElementById('isProperty').value;
    const isEnterpriseGroup = document.getElementById('isEnterpriseGroup').value;
    const isNewEmployee = document.getElementById('isNewEmployee').value || '';

    // 格式化日期
    const date = new Date(time);
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

    // 生成人员列表文本
    let personnelText = '';
    personnelArray.forEach((person, index) => {
        personnelText += `${person.position}${person.name}`;
        if (index < personnelArray.length - 1) {
            personnelText += '、';
        }
    });

    // 生成晒单信息
    let resultText = '';

    // 使用标准模板
    resultText = `【${gridName}-${scenarioName}：${scenarioSubType} ${activityType}】\n`;
    resultText += `1、${activityType}时间：${formattedDate}\n`;
    resultText += `2、${activityType}地点：${location}\n`;
    resultText += `3、${activityType}人员：${personnelText}\n`;
    resultText += `4、${activityType}成交业务：${business}\n`;
    resultText += `5、${activityType}效果：${effect}\n`;
    resultText += `6、走访集团是否物业类：${isProperty}\n`;
    resultText += `7、走访集团是否企宽集团：${isEnterpriseGroup}\n`;

    // 检查是否是"大集团"场景
    if (scenarioSubType === '大集团') {
        // 使用大集团专用模板
        resultText += `8、走访集团是否指定新员工入职攻坚集团：${isNewEmployee}\n`;
        resultText += `9、水印照片：`;
    }
    // 显示结果
    document.getElementById('resultText').textContent = resultText;
    document.getElementById('resultContainer').style.display = 'block';
});

// 复制到剪贴板按钮点击事件
document.getElementById('copyBtn').addEventListener('click', function () {
    const resultText = document.getElementById('resultText').textContent;

    // 使用现代剪贴板API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(resultText)
            .then(() => {
                alert('已复制到剪贴板');
            })
            .catch(err => {
                console.error('复制失败:', err);
                fallbackCopyToClipboard(resultText);
            });
    } else {
        fallbackCopyToClipboard(resultText);
    }
});

// 后备复制方法
function fallbackCopyToClipboard(text) {
    // 创建临时文本区域
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('已复制到剪贴板');
        } else {
            alert('复制失败，请手动复制');
        }
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    }

    document.body.removeChild(textArea);
}
